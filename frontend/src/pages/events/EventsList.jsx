import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, createEvent } from '../../api/eventApi';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select } from '../../components/ui/select';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../../components/ui/dialog';
import { useAuth } from '../../lib/auth';
import {
  CalendarDays, MapPin, Users, PlusCircle, Search,
  Calendar, ChevronRight
} from 'lucide-react';
import { DatePicker } from '../../components/ui/calendar';

export default function EventsList() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Host Event Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventTime, setEventTime] = useState('10:00');
  const [form, setForm] = useState({
    name: '',
    type: 'Technical Workshop',
    date: '',
    location: '',
    description: ''
  });

  async function fetchEvents() {
    try {
      setLoading(true);
      const res = await getEvents();
      setEvents(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load events', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
    const handleFocus = () => fetchEvents();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Calculate dynamic registration counts strictly on upcoming events for the logged-in user
  const now = new Date();
  const upcomingEvents = events.filter((ev) => new Date(ev.date) >= now);
  const registeredEvents = upcomingEvents.filter((ev) => Boolean(ev.isRegistered));
  const notRegisteredEvents = upcomingEvents.filter((ev) => !ev.isRegistered);
  const registeredCount = registeredEvents.length;
  const notRegisteredCount = notRegisteredEvents.length;

  const filterOptions = [
    { key: 'all', label: 'All Events' },
    { key: 'Technical Workshop', label: 'Technical Workshop' },
    { key: 'Networking', label: 'Networking' },
    { key: 'Career Guidance', label: 'Career Guidance' },
    { key: 'Webinar', label: 'Webinar' },
    { key: 'registered', label: `Registered (${registeredCount})` },
    { key: 'not-registered', label: `Not Registered (${notRegisteredCount})` }
  ];

  const eventTypes = [
    'Technical Workshop',
    'Career Guidance',
    'Webinar',
    'Networking'
  ];

  const handleOpenCreateModal = () => {
    setForm({
      name: '',
      type: 'Technical Workshop',
      date: '',
      location: '',
      description: ''
    });
    setEventDate(new Date().toISOString().split('T')[0]);
    setEventTime('10:00');
    setCreateError('');
    setCreateModalOpen(true);
  };

  async function handleCreateEvent(e) {
    e.preventDefault();
    setCreateError('');

    if (!form.name.trim() || !eventDate || !eventTime) {
      setCreateError('Event name, date, and time are required.');
      return;
    }

    const combinedDateTime = `${eventDate}T${eventTime}`;
    const eventDateObj = new Date(combinedDateTime);
    if (isNaN(eventDateObj.getTime())) {
      setCreateError('Please provide a valid date and time.');
      return;
    }

    if (eventDateObj < new Date()) {
      setCreateError('Event date and time cannot be in the past. Please select today or a future date and time.');
      return;
    }

    try {
      setCreating(true);
      await createEvent({ ...form, date: combinedDateTime });
      setCreateModalOpen(false);
      setForm({
        name: '',
        type: 'Technical Workshop',
        date: '',
        location: '',
        description: ''
      });
      fetchEvents();
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Could not create event');
    } finally {
      setCreating(false);
    }
  }

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.name?.toLowerCase().includes(search.toLowerCase()) ||
      ev.location?.toLowerCase().includes(search.toLowerCase()) ||
      ev.description?.toLowerCase().includes(search.toLowerCase());

    const isPast = new Date(ev.date) < now;

    let matchesFilter = true;
    if (selectedType === 'all') {
      matchesFilter = true;
    } else if (selectedType === 'registered') {
      matchesFilter = !isPast && Boolean(ev.isRegistered);
    } else if (selectedType === 'not-registered') {
      matchesFilter = !isPast && !ev.isRegistered;
    } else {
      matchesFilter = ev.type?.toLowerCase() === selectedType.toLowerCase();
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-indigo-600" />
            Events, Workshops & Networking
          </h1>
          <p className="text-sm text-slate-500">
            Join tech workshops, mock interview sessions, and campus networking meets hosted by alumni.
          </p>
        </div>

        {(user?.role === 'alumni' || user?.role === 'admin') && (
          <Button
            onClick={handleOpenCreateModal}
            className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1.5 text-xs font-semibold"
          >
            <PlusCircle className="w-4 h-4" /> Host an Event
          </Button>
        )}
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setSelectedType(opt.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedType === opt.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <Input
            placeholder="Search events by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <Card className="text-center py-16 border-dashed">
          <CardContent className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <CalendarDays className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800">No events found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              No campus sessions currently match your filter criteria. Check back soon for newly published meetups.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((e) => {
            const dateObj = new Date(e.date);
            const isPast = dateObj < new Date();

            return (
              <Card
                key={e._id}
                className="overflow-hidden border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header Color Bar */}
                  <div className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {e.type}
                      </span>
                      {isPast ? (
                        <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                          ✓ COMPLETED
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Upcoming
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {e.name}
                    </h2>
                  </div>

                  <CardContent className="px-5 pb-4 space-y-3">
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {e.description || 'No description provided.'}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {dateObj.toLocaleDateString(undefined, {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{e.location || 'Online'}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{e.participantCount || 0} Registered Attendees</span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                <div className="p-5 pt-0">
                  <Link to={`/events/${e._id}`} className="block w-full">
                    <Button
                      variant="outline"
                      className={`w-full flex items-center justify-center gap-1.5 text-xs font-semibold ${
                        isPast
                          ? 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                          : e.isRegistered
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-200'
                      }`}
                    >
                      {isPast ? (
                        '✓ COMPLETED'
                      ) : e.isRegistered ? (
                        '✓ Registered'
                      ) : (
                        <>
                          See Details <ChevronRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Host Event Dialog Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            Host a Campus Event or Workshop
          </DialogTitle>
          <DialogDescription>
            Publish a session for students and alumni to share industry insights and technical mastery.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateEvent}>
          <DialogContent className="space-y-4">
            {createError && (
              <Alert variant="destructive">
                <AlertDescription>{createError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-1.5">
              <Label>Event Title</Label>
              <Input
                required
                placeholder="e.g. Masterclass: Scalable Backend Architecture in Node.js"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Event Category / Type</Label>
                <Select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Event Date & Time</Label>
                <div className="grid grid-cols-5 gap-2">
                  <div className="col-span-3">
                    <DatePicker
                      value={eventDate}
                      onChange={(d) => setEventDate(d)}
                      minDate={new Date()}
                      theme="emerald"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      required
                      className="px-2 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Location / Meeting Venue</Label>
              <Input
                placeholder="e.g. Virtual (Zoom / Meet) or Main Campus Auditorium"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Description & Overview</Label>
              <Textarea
                rows={3}
                placeholder="Key topics to be covered, target audience, and prerequisites..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </DialogContent>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={creating}
              className="bg-emerald-600 hover:bg-emerald-700 font-semibold"
            >
              {creating ? 'Publishing Event...' : 'Publish Event'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
