import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitReferral } from '../../api/referralApi';
import { getStudentsList } from '../../api/studentApi';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select } from '../../components/ui/select';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { BriefcaseBusiness } from 'lucide-react';

export default function SubmitReferral() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  const [form, setForm] = useState({
    studentId: '',
    company: '',
    role: '',
    applicationLink: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoadingStudents(true);
        const res = await getStudentsList();
        const list = res.data?.data || [];
        setStudents(list);
        if (list.length > 0) {
          setForm((prev) => ({ ...prev, studentId: list[0].userId?._id || '' }));
        }
      } catch (err) {
        console.error('Failed to load student list', err);
      } finally {
        setLoadingStudents(false);
      }
    }
    fetchStudents();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!form.studentId) {
      setError('Please select a student to refer');
      return;
    }

    if (!form.company.trim()) {
      setError('Please enter the hiring company or organization');
      return;
    }

    if (!form.role.trim()) {
      setError('Please enter the job title or position');
      return;
    }

    if (!form.applicationLink.trim()) {
      setError('Please enter the link to apply for the job');
      return;
    }

    const urlPattern = /^https?:\/\/.+/i;
    if (!urlPattern.test(form.applicationLink.trim())) {
      setError('Please enter a valid application URL (e.g. https://company.com/careers/job-123)');
      return;
    }

    try {
      setSubmitting(true);
      await submitReferral({
        studentId: form.studentId,
        company: form.company.trim(),
        role: form.role.trim(),
        applicationLink: form.applicationLink.trim()
      });
      setMessage('Referral submitted successfully!');
      setTimeout(() => navigate('/referrals'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit referral');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BriefcaseBusiness className="w-6 h-6 text-emerald-600" />
          Submit a Student Job / Internship Referral
        </h1>
        <p className="text-sm text-slate-500">
          Recommend a talented student from our campus network directly into your organization's hiring pipeline.
        </p>
      </div>

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

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student Selector */}
            <div className="space-y-1.5">
              <Label>Select Student to Refer</Label>
              {loadingStudents ? (
                <div className="text-xs text-slate-400 py-2">Loading campus students...</div>
              ) : students.length === 0 ? (
                <div className="text-xs text-red-500 py-2">No students found in platform directory.</div>
              ) : (
                <Select
                  value={form.studentId}
                  onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                  required
                >
                  {students.map((st) => (
                    <option key={st._id} value={st.userId?._id}>
                      {st.userId?.name} ({st.department || 'Student'} - {st.year || 'Undergraduate'})
                    </option>
                  ))}
                </Select>
              )}
            </div>

            {/* Company */}
            <div className="space-y-1.5">
              <Label>Hiring Company / Organization</Label>
              <Input
                required
                placeholder="Google, Microsoft, TCS, Deloitte, Amazon"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <Label>Job Title / Position</Label>
              <Input
                required
                placeholder="Associate Software Engineer, Data Analyst Intern"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>

            {/* Link to Apply for Job */}
            <div className="space-y-1.5">
              <Label>Link to Apply for Job</Label>
              <Input
                required
                type="url"
                placeholder="https://company.com/careers/job-123"
                value={form.applicationLink}
                onChange={(e) => setForm({ ...form, applicationLink: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => navigate('/referrals')}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || loadingStudents}
                className="bg-emerald-600 hover:bg-emerald-700 font-semibold px-5"
              >
                {submitting ? 'Submitting Referral...' : 'Submit Referral'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
