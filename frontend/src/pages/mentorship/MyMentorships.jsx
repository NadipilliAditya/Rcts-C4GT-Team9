import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import { getMentorships, updateMentorship, addMentorshipSession } from '../../api/mentorshipApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge, statusClass } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../../components/ui/dialog';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useAuth } from '../../lib/auth';
import {
  GraduationCap, Calendar, Clock, BookOpen, CheckCircle,
  XCircle, PlusCircle, Star, Sparkles, Filter, Video, ExternalLink
} from 'lucide-react';
import { DatePicker, formatYYYYMMDD } from '../../components/ui/calendar';
import RequestMentorshipButton from '../../components/mentorship/RequestMentorshipButton';

function isSessionCompleted(sessionDateInput) {
  if (!sessionDateInput) return false;
  const sessionDate = new Date(sessionDateInput);
  if (isNaN(sessionDate.getTime())) return false;
  const now = new Date();

  // If date represents a date-only (midnight UTC or local), it is completed when the day has passed
  const isMidnight =
    (sessionDate.getUTCHours() === 0 && sessionDate.getUTCMinutes() === 0 && sessionDate.getUTCSeconds() === 0) ||
    (sessionDate.getHours() === 0 && sessionDate.getMinutes() === 0 && sessionDate.getSeconds() === 0);

  if (isMidnight) {
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sessionDayStart = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
    return sessionDayStart < todayStart;
  }
  return sessionDate < now;
}

export default function MyMentorships({ onBack, onToggleSidebar }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Session Logging Modal State
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  const [sessionForm, setSessionForm] = useState({
    date: formatYYYYMMDD(),
    topic: '',
    notes: '',
    meetingLink: ''
  });
  const [sessionSaving, setSessionSaving] = useState(false);
  const [sessionError, setSessionError] = useState('');

  // Completion & Feedback Modal State
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [completeSaving, setCompleteSaving] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const r = await getMentorships();
      setItems(r.data.data || []);
    } catch (e) {
      setError(e.response?.data?.message || 'Could not load mentorships');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function changeStatus(id, status) {
    try {
      await updateMentorship(id, { status });
      load();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to update mentorship status');
    }
  }

  // Open Log Session Dialog
  const handleOpenSessionModal = (mentorship) => {
    setSelectedMentorship(mentorship);
    setSessionForm({
      date: formatYYYYMMDD(),
      topic: '',
      notes: '',
      meetingLink: ''
    });
    setSessionError('');
    setSessionModalOpen(true);
  };

  // Submit Logged Session
  const handleSaveSession = async (e) => {
    e.preventDefault();
    setSessionError('');
    if (!sessionForm.topic.trim()) {
      setSessionError('Session topic is required.');
      return;
    }

    // Dynamic date validation: cannot select past date
    const todayStr = formatYYYYMMDD();
    if (sessionForm.date < todayStr) {
      setSessionError('Meeting date cannot be in the past. Please select today or a future date.');
      return;
    }

    // Meeting link is mandatory
    if (!sessionForm.meetingLink?.trim()) {
      setSessionError('Meeting link is required.');
      return;
    }

    // URL validation
    try {
      const url = new URL(sessionForm.meetingLink.trim());
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error();
      }
    } catch (err) {
      setSessionError('Please enter a valid meeting URL (e.g. https://meet.google.com/abc-defg-hij)');
      return;
    }

    try {
      setSessionSaving(true);
      await addMentorshipSession(selectedMentorship._id, sessionForm);
      setSessionModalOpen(false);
      load();
    } catch (err) {
      setSessionError(err.response?.data?.message || 'Failed to save session');
    } finally {
      setSessionSaving(false);
    }
  };

  // Open Complete & Feedback Dialog
  const handleOpenCompleteModal = (mentorship) => {
    setSelectedMentorship(mentorship);
    setFeedbackText(mentorship.feedback || '');
    setCompleteModalOpen(true);
  };

  // Submit Completion & Feedback
  const handleCompleteMentorship = async (e) => {
    e.preventDefault();
    try {
      setCompleteSaving(true);
      await updateMentorship(selectedMentorship._id, {
        status: 'completed',
        feedback: feedbackText
      });
      setCompleteModalOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to complete mentorship');
    } finally {
      setCompleteSaving(false);
    }
  };

  // Filter items by status tab
  const filteredItems = items.filter((m) => {
    if (activeTab === 'all') return true;
    return m.status === activeTab;
  });

  const getPartnerName = (m) => {
    if (user.role === 'student') return m.alumniId?.name || 'Alumni Mentor';
    if (user.role === 'alumni') return m.studentId?.name || 'Student Mentee';
    return `${m.studentId?.name || 'Student'} ➔ ${m.alumniId?.name || 'Alumni'}`;
  };

  const getPartnerEmail = (m) => {
    if (user.role === 'student') return m.alumniId?.email;
    if (user.role === 'alumni') return m.studentId?.email;
    return null;
  };

  return (
    <div className="flex-1 min-w-0 bg-[#f8fafc] pb-12 min-h-screen">
      <Header
        title="Mentorships & 1-on-1 Sessions"
        subtitle="Track student-alumni pairings, log meeting discussions, monitor milestones, and exchange reviews"
        onBack={onBack}
        onToggleSidebar={onToggleSidebar}
      />

      <main className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              1-on-1 Mentorship Sessions
            </h2>
          </div>

          {user?.role === 'student' && (
            <RequestMentorshipButton onSuccess={load} />
          )}
        </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/60 rounded-xl w-fit">
        {[
          { key: 'all', label: `All (${items.length})` },
          { key: 'active', label: `Active (${items.filter((m) => m.status === 'active').length})` },
          { key: 'requested', label: `Requested (${items.filter((m) => m.status === 'requested').length})` },
          { key: 'completed', label: `Completed (${items.filter((m) => m.status === 'completed').length})` },
          { key: 'rejected', label: `Declined (${items.filter((m) => m.status === 'rejected').length})` }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mentorship Cards */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <Card className="text-center py-16 border-dashed">
          <CardContent className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800">No mentorships found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {user.role === 'student'
                ? 'Discover experienced alumni mentors and send a mentorship request to get started!'
                : 'Student mentorship requests will appear here for review and scheduling.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((m) => {
            const partnerName = getPartnerName(m);
            const partnerEmail = getPartnerEmail(m);
            const sessions = m.sessions || [];

            return (
              <Card key={m._id} className="border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Top Card Bar */}
                <div className="p-5 md:p-6 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-base">
                      {partnerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        {partnerName}
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200/80 font-medium text-slate-700">
                          {m.domain}
                        </span>
                      </h3>
                      {partnerEmail && <p className="text-xs text-slate-400 mt-0.5">{partnerEmail}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={`${statusClass(m.status)} uppercase tracking-wider text-[11px] px-3 py-1 font-bold`}>
                      {m.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5 md:p-6 space-y-5">
                  {/* Goal Section */}
                  <div className="rounded-xl bg-purple-50/40 p-4 border border-purple-100">
                    <span className="text-xs uppercase font-bold tracking-wider text-purple-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Mentorship Goal & Focus
                    </span>
                    <p className="text-sm font-medium text-slate-800 mt-1 leading-relaxed">
                      {m.goal}
                    </p>
                  </div>

                  {/* Feedback Section (if completed) */}
                  {m.feedback && (
                    <div className="rounded-xl bg-blue-50/40 p-4 border border-blue-100">
                      <span className="text-xs uppercase font-bold tracking-wider text-blue-700 flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5" /> Mentorship Feedback & Review
                      </span>
                      <p className="text-sm italic text-slate-700 mt-1 leading-relaxed">
                        "{m.feedback}"
                      </p>
                    </div>
                  )}

                  {/* Sessions Timeline */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        Meeting Sessions ({sessions.length})
                      </h4>

                      {/* Log Session Action (For Active Mentorships) */}
                      {m.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenSessionModal(m)}
                          className="text-xs py-1 px-2.5 h-8 flex items-center gap-1.5 border-purple-200 text-purple-700 hover:bg-purple-50"
                        >
                          <PlusCircle className="w-3.5 h-3.5" /> Log Session
                        </Button>
                      )}
                    </div>

                    {sessions.length === 0 ? (
                      <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-dashed">
                        No sessions logged yet. {m.status === 'active' ? 'Click "+ Log Session" after meeting.' : ''}
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {sessions.map((sess, idx) => {
                          const completed = sess.status === 'completed' || isSessionCompleted(sess.date);

                          return (
                            <div
                              key={sess._id || idx}
                              className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2 hover:bg-slate-100/70 transition"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-800 text-sm">
                                    #{idx + 1}: {sess.topic}
                                  </span>
                                  {completed && (
                                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full border border-slate-200">
                                      ✓ COMPLETED
                                    </span>
                                  )}
                                </div>
                                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                                  <Calendar className="w-3 h-3" />
                                  {sess.date ? new Date(sess.date).toLocaleDateString() : 'Date'}
                                </span>
                              </div>
                              {sess.notes && (
                                <p className="text-slate-600 leading-relaxed">
                                  {sess.notes}
                                </p>
                              )}
                              {sess.meetingLink && (
                                <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5 text-slate-500 truncate max-w-xs sm:max-w-md">
                                    <Video className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                    <span className="text-slate-500 truncate text-[11px]">
                                      {sess.meetingLink}
                                    </span>
                                  </div>
                                  {completed ? (
                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 font-bold text-xs border border-slate-200 cursor-not-allowed select-none">
                                      ✓ COMPLETED
                                    </span>
                                  ) : (
                                    <a
                                      href={sess.meetingLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-sm transition active:scale-95"
                                    >
                                      <Video className="w-3.5 h-3.5" />
                                      Join Meeting
                                    </a>
                                  )}
                                </div>
                              )}
                              {!sess.meetingLink && completed && (
                                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end">
                                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 font-bold text-xs border border-slate-200 cursor-not-allowed select-none">
                                    ✓ COMPLETED
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Controls */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    {/* Alumni Actions for Requested */}
                    {user.role === 'alumni' && m.status === 'requested' && (
                      <>
                        <Button
                          variant="green"
                          onClick={() => changeStatus(m._id, 'active')}
                          className="flex items-center gap-1.5 text-xs"
                        >
                          <CheckCircle className="w-4 h-4" /> Accept Mentorship
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => changeStatus(m._id, 'rejected')}
                          className="flex items-center gap-1.5 text-xs"
                        >
                          <XCircle className="w-4 h-4" /> Decline
                        </Button>
                      </>
                    )}

                    {/* Completion Action for Active */}
                    {m.status === 'active' && (user.role === 'alumni' || user.role === 'admin') && (
                      <Button
                        variant="default"
                        onClick={() => handleOpenCompleteModal(m)}
                        className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1.5 text-xs"
                      >
                        <CheckCircle className="w-4 h-4" /> Complete & Add Feedback
                      </Button>
                    )}

                    {/* Student Feedback on Completed */}
                    {m.status === 'completed' && user.role === 'student' && !m.feedback && (
                      <Button
                        variant="outline"
                        onClick={() => handleOpenCompleteModal(m)}
                        className="flex items-center gap-1.5 text-xs text-purple-700 border-purple-200 hover:bg-purple-50"
                      >
                        <Star className="w-4 h-4" /> Share Experience Feedback
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Log Session Dialog Modal */}
      <Dialog open={sessionModalOpen} onOpenChange={setSessionModalOpen}>
        <DialogHeader>
          <DialogTitle>Log 1-on-1 Mentorship Session</DialogTitle>
          <DialogDescription>
            Record session topic, meeting date, and actionable discussion points for this mentorship.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSaveSession}>
          <DialogContent className="space-y-4">
            {sessionError && (
              <Alert variant="destructive">
                <AlertDescription>{sessionError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-1.5">
              <Label>Meeting Date</Label>
              <DatePicker
                value={sessionForm.date}
                onChange={(date) => setSessionForm({ ...sessionForm, date })}
                minDate={new Date()}
                theme="purple"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label>Session Topic</Label>
              <Input
                placeholder="e.g. Resume Polish, System Design Mock Interview, AWS Setup"
                value={sessionForm.topic}
                onChange={(e) => setSessionForm({ ...sessionForm, topic: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label>Meeting Link</Label>
              <Input
                type="url"
                required
                placeholder="https://meet.google.com/abc-defg-hij"
                value={sessionForm.meetingLink}
                onChange={(e) => setSessionForm({ ...sessionForm, meetingLink: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Discussion Notes & Action Items</Label>
              <Textarea
                rows={4}
                placeholder="Summary of recommendations, questions discussed, and next steps..."
                value={sessionForm.notes}
                onChange={(e) => setSessionForm({ ...sessionForm, notes: e.target.value })}
              />
            </div>
          </DialogContent>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setSessionModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={sessionSaving} className="bg-purple-600 hover:bg-purple-700">
              {sessionSaving ? 'Saving...' : 'Save Session Log'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Completion & Feedback Dialog Modal */}
      <Dialog open={completeModalOpen} onOpenChange={setCompleteModalOpen}>
        <DialogHeader>
          <DialogTitle>Mentorship Completion & Feedback</DialogTitle>
          <DialogDescription>
            Mark this mentorship journey as completed and leave feedback on the overall engagement.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCompleteMentorship}>
          <DialogContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Feedback & Reflection Notes</Label>
              <Textarea
                rows={4}
                placeholder="Share your thoughts on the mentee's progress, strengths, and advice for the future..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                required
              />
            </div>
          </DialogContent>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setCompleteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={completeSaving} className="bg-emerald-600 hover:bg-emerald-700">
              {completeSaving ? 'Submitting...' : 'Complete Mentorship'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      </main>
    </div>
  );
}
