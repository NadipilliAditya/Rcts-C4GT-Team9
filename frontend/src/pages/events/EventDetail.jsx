import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEventById, participate, cancelParticipation, deleteEvent } from '../../api/eventApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useAuth } from '../../lib/auth';
import {
  CalendarDays, MapPin, Users, Calendar, Clock, ArrowLeft,
  CheckCircle, Trash2, User, ShieldCheck, Sparkles, AlertCircle
} from 'lucide-react';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await getEventById(id);
      setEvent(res.data?.data);
    } catch (err) {
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const isRegistered =
    Boolean(event?.isRegistered) ||
    event?.participants?.some(
      (p) => p.user?._id === user?.id || p.user === user?.id
    );

  const isCreatorOrAdmin =
    user?.role === 'admin' ||
    event?.createdBy?._id === user?.id ||
    event?.createdBy === user?.id;

  const handleRegister = async () => {
    if (new Date(event?.date) < new Date()) {
      setError('This event has already been completed.');
      return;
    }
    try {
      setActionLoading(true);
      setError('');
      setMessage('');
      await participate(id);
      setMessage('You have successfully registered for this event!');
      fetchEvent();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not register for event');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelRegistration = async () => {
    try {
      setActionLoading(true);
      setError('');
      setMessage('');
      await cancelParticipation(id);
      setMessage('Your event registration has been cancelled.');
      fetchEvent();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel registration');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteEvent(id);
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Event not found.</p>
        <Link to="/events" className="text-indigo-600 font-semibold mt-2 inline-block">
          Back to Events
        </Link>
      </div>
    );
  }

  const dateObj = new Date(event.date);
  const isCompleted = dateObj < new Date();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <Link
        to="/events"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Events
      </Link>

      {message && (
        <Alert variant="success">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Event Details Card */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 p-6 flex items-end">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md">
            {event.type}
          </span>
        </div>

        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b pb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {event.name}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Hosted by: <strong className="text-slate-700">{event.createdBy?.name || 'Campus Faculty'}</strong>
                {event.createdBy?.role && ` (${event.createdBy.role})`}
              </p>
            </div>

            {/* Registration Action Button / Completed Status */}
            <div className="flex items-center gap-3">
              {isCompleted ? (
                <Button
                  disabled
                  variant="outline"
                  className="text-xs font-semibold px-5 py-2.5 bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed opacity-90 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4 text-slate-400" />
                  ✓ Completed
                </Button>
              ) : isRegistered ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    You are Registered
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={actionLoading}
                    onClick={handleCancelRegistration}
                    className="text-xs text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                  >
                    Withdraw
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleRegister}
                  disabled={actionLoading}
                  className={`text-xs font-semibold px-5 py-2.5 ${
                    user?.role === 'alumni'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  {actionLoading ? 'Registering...' : 'Register to Attend'}
                </Button>
              )}

              {isCreatorOrAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="text-xs text-red-600 hover:bg-red-50 border-red-200"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Quick Details Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Date & Time</span>
                <p className="text-xs font-bold text-slate-800">
                  {dateObj.toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Venue / Platform</span>
                <p className="text-xs font-bold text-slate-800 truncate">{event.location || 'Virtual'}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Users className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Attendees</span>
                <p className="text-xs font-bold text-slate-800">
                  {event.participants?.length || 0} Registered
                </p>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">About this Event</h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
              {event.description || 'No detailed description provided.'}
            </p>
          </div>

          {/* Registered Participants Roster */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                Registered Participants ({event.participants?.length || 0})
              </h3>
            </div>

            {event.participants?.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl text-center">
                No participants registered yet. Be the first to register!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.participants.map((p, idx) => {
                  const u = p.user || {};
                  return (
                    <div
                      key={p._id || idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                          {u.name ? u.name.charAt(0).toUpperCase() : 'P'}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{u.name || 'Participant'}</p>
                          <p className="text-[10px] text-slate-400">{u.email}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200/80 text-slate-700">
                        {u.role || 'Member'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
