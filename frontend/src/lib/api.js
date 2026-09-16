// Resilient API client — real backend first, mock fallback for unimplemented routes
import axios from 'axios';

// ─── Real axios instance pointing at Express backend ─────────────────────────
const realAxios = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT token if present
realAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('alumniconnect_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Mock localStorage fallback (for routes not yet on the backend) ───────────
const initialMockState = {
  overview: {
    totalAlumni: 22,
    totalAlumniGrowth: 0,
    activeAlumni: 22,
    activeAlumniGrowth: 0,
    mentors: 18,
    mentorsGrowth: 0,
    connections: 77,
    connectionsGrowth: 0,
    topEngagedAlumni: []
  },
  departmentData: [
    { department: "AI & Data Science", count: 13, percentage: 59.1 },
    { department: "Computer Science & Data", count: 5, percentage: 22.7 },
    { department: "CS & Artificial Intelligence", count: 3, percentage: 13.6 },
    { department: "CS & Machine Learning", count: 1, percentage: 4.5 }
  ],
  industryData: [
    { industry: "Technology", count: 14, percentage: 63.6 },
    { industry: "Research", count: 4, percentage: 18.2 },
    { industry: "Education", count: 2, percentage: 9.1 },
    { industry: "Healthcare", count: 2, percentage: 9.1 }
  ],
  engagementTrend: [
    { month: "Jan", activeUsers: 8, mentorshipSessions: 5, eventAttendees: 10 },
    { month: "Feb", activeUsers: 10, mentorshipSessions: 7, eventAttendees: 14 },
    { month: "Mar", activeUsers: 12, mentorshipSessions: 9, eventAttendees: 16 },
    { month: "Apr", activeUsers: 14, mentorshipSessions: 11, eventAttendees: 18 },
    { month: "May", activeUsers: 16, mentorshipSessions: 13, eventAttendees: 20 },
    { month: "Jun", activeUsers: 18, mentorshipSessions: 15, eventAttendees: 22 },
    { month: "Jul", activeUsers: 20, mentorshipSessions: 17, eventAttendees: 20 },
    { month: "Aug", activeUsers: 22, mentorshipSessions: 18, eventAttendees: 22 }
  ],
  mentorshipDomains: [
    { domain: "Software Development", count: 8 },
    { domain: "Data Science & AI", count: 7 },
    { domain: "Product Management", count: 4 },
    { domain: "Research & Academia", count: 3 }
  ],
  eventParticipation: [
    { month: "Q1 2025", webinars: 12, workshops: 8, reunions: 5 },
    { month: "Q2 2025", webinars: 16, workshops: 10, reunions: 8 },
    { month: "Q3 2025", webinars: 18, workshops: 12, reunions: 10 },
    { month: "Q4 2025", webinars: 20, workshops: 14, reunions: 12 }
  ],
  events: [
    {
      _id: "evt-1", id: "1",
      name: "Alumni Tech Summit 2026",
      title: "Alumni Tech Summit 2026",
      type: "Conference",
      date: "2026-10-15T10:00:00.000Z",
      location: "KIET Auditorium",
      description: "Annual alumni tech summit with industry keynotes and networking.",
      attendeesCount: 80, maxCapacity: 200, status: "Upcoming",
      participants: [], creator: { name: "Admin", email: "admin@alumniconnect.edu" }
    },
    {
      _id: "evt-2", id: "2",
      name: "AI & ML Career Bootcamp",
      title: "AI & ML Career Bootcamp",
      type: "Technical Workshop",
      date: "2026-11-05T14:00:00.000Z",
      location: "Virtual (Zoom)",
      description: "Hands-on bootcamp on building AI/ML applications.",
      attendeesCount: 45, maxCapacity: 100, status: "Upcoming",
      participants: [], creator: { name: "Admin", email: "admin@alumniconnect.edu" }
    }
  ],
  studentList: [
    { id: "1", name: "Alex Rivera", email: "student@alumniconnect.edu", batch: "2025", department: "Computer Science", gpa: "3.85", mentorshipRequests: 3, status: "Active" }
  ],
  mentorships: [],
  referrals: []
};

function getStore() {
  const data = localStorage.getItem('alumniconnect_db');
  if (data) {
    try { return JSON.parse(data); } catch (e) {}
  }
  localStorage.setItem('alumniconnect_db', JSON.stringify(initialMockState));
  return initialMockState;
}

function saveStore(store) {
  localStorage.setItem('alumniconnect_db', JSON.stringify(store));
}

// ─── Smart API: try real backend, fallback to mock ────────────────────────────
const api = {
  async get(url, config = {}) {
    try {
      const res = await realAxios.get(url, config);
      return res;
    } catch (err) {
      console.warn(`[api] Backend unavailable for GET ${url}, using mock.`, err.message);
      return mockGet(url, config);
    }
  },

  async post(url, body) {
    try {
      const res = await realAxios.post(url, body);
      return res;
    } catch (err) {
      console.warn(`[api] Backend unavailable for POST ${url}, using mock.`, err.message);
      return mockPost(url, body);
    }
  },

  async put(url, body) {
    try {
      const res = await realAxios.put(url, body);
      return res;
    } catch (err) {
      console.warn(`[api] Backend unavailable for PUT ${url}, using mock.`, err.message);
      return mockPut(url, body);
    }
  },

  async delete(url) {
    try {
      const res = await realAxios.delete(url);
      return res;
    } catch (err) {
      console.warn(`[api] Backend unavailable for DELETE ${url}, using mock.`, err.message);
      return mockDelete(url);
    }
  }
};

// ─── Mock handlers (fallback only) ───────────────────────────────────────────
function mockGet(url, config = {}) {
  const store = getStore();
  const cleanUrl = url.split('?')[0];

  if (cleanUrl.includes('/analytics/overview')) return { data: store.overview };
  if (cleanUrl.includes('/analytics/by-department')) return { data: store.departmentData };
  if (cleanUrl.includes('/analytics/by-industry')) return { data: store.industryData };
  if (cleanUrl.includes('/analytics/engagement-trend')) return { data: store.engagementTrend };
  if (cleanUrl.includes('/analytics/mentorship-domains')) return { data: store.mentorshipDomains };
  if (cleanUrl.includes('/analytics/event-participation')) return { data: store.eventParticipation };

  if (cleanUrl === '/alumni' || cleanUrl === '/api/alumni') {
    let list = store.alumniList || [];
    const search = config.params?.search?.toLowerCase();
    if (search) list = list.filter(a => a.name.toLowerCase().includes(search));
    return { data: { success: true, count: list.length, data: list } };
  }

  if (cleanUrl === '/students' || cleanUrl === '/api/students') {
    return { data: store.studentList || [] };
  }

  if (cleanUrl === '/events' || cleanUrl === '/api/events') {
    return { data: { success: true, data: store.events || [] } };
  }

  if (cleanUrl === '/mentorships' || cleanUrl === '/api/mentorships') {
    return { data: { data: store.mentorships || [] } };
  }

  if (cleanUrl === '/referrals' || cleanUrl === '/api/referrals') {
    return { data: { data: store.referrals || [] } };
  }

  return { data: [] };
}

async function mockPost(url, body) {
  const store = getStore();

  if (url.includes('/events') && !url.includes('/participate') && !url.includes('/cancel')) {
    const newEvent = { _id: 'evt-' + Date.now(), id: String(Date.now()), attendeesCount: 0, maxCapacity: 100, status: 'Upcoming', participants: [], ...body };
    store.events.unshift(newEvent);
    saveStore(store);
    return { data: { success: true, data: newEvent } };
  }

  if (url.includes('/mentorships')) {
    const newM = { _id: 'ment-' + Date.now(), id: String(Date.now()), status: 'Pending', sessions: [], createdAt: new Date().toISOString(), ...body };
    store.mentorships.unshift(newM);
    saveStore(store);
    return { data: { data: newM } };
  }

  if (url.includes('/referrals')) {
    const newRef = { _id: 'ref-' + Date.now(), id: String(Date.now()), status: 'Pending', createdAt: new Date().toISOString(), ...body };
    store.referrals.unshift(newRef);
    saveStore(store);
    return { data: { data: newRef } };
  }

  return { data: { success: true } };
}

async function mockPut(url, body) {
  const store = getStore();

  if (url.includes('/events/')) {
    const id = url.split('/events/')[1];
    const idx = store.events.findIndex(e => e._id === id || e.id === id);
    if (idx !== -1) {
      store.events[idx] = { ...store.events[idx], ...body };
      saveStore(store);
      return { data: store.events[idx] };
    }
  }

  if (url.includes('/mentorships/')) {
    const id = url.split('/mentorships/')[1];
    const idx = store.mentorships.findIndex(m => m._id === id || m.id === id);
    if (idx !== -1) {
      store.mentorships[idx] = { ...store.mentorships[idx], ...body };
      saveStore(store);
      return { data: store.mentorships[idx] };
    }
  }

  return { data: { success: true } };
}

async function mockDelete(url) {
  const store = getStore();

  if (url.includes('/events/')) {
    const id = url.split('/events/')[1];
    store.events = store.events.filter(e => e._id !== id && e.id !== id);
    saveStore(store);
    return { data: { success: true } };
  }

  return { data: { success: true } };
}

export default api;
