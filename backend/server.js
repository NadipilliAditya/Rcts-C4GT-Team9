const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { realAlumni } = require('./data/alumniDataset');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'alumniconnect_super_secret_key_2024';

app.use(cors({
  origin: (origin, callback) => {
    // Allow any localhost origin (5173, 5174, etc.) or no origin
    if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// In-memory alumni list initialized with real dataset
let alumniStore = [...realAlumni];

// In-memory users store
const users = [
  {
    id: 'ADMIN-001',
    name: 'Dr. Aris Vance',
    email: 'admin@alumniconnect.edu',
    passwordHash: bcrypt.hashSync('Admin@123', 10),
    role: 'admin',
    department: 'Computer Science',
    company: 'AlumniConnect HQ',
    designation: 'Platform Administrator',
    batch: '2016',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: 'ALUMNI-001',
    name: 'PAVANI KADARI',
    email: 'kadaripavani1@gmail.com',
    passwordHash: bcrypt.hashSync('Alumni@123', 10),
    role: 'alumni',
    department: 'Artificial Intelligence & Data Science',
    company: 'DATA I2I',
    designation: 'AI Engineer',
    batch: '2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    skills: ['Python', 'AI/ML', 'Data Engineering'],
    location: 'Hyderabad, India'
  },
  {
    id: 'STUDENT-001',
    name: 'Alex Rivera',
    email: 'student@alumniconnect.edu',
    passwordHash: bcrypt.hashSync('Student@123', 10),
    role: 'student',
    department: 'Computer Science',
    company: 'KIET Student Club',
    designation: 'Undergraduate Student',
    batch: '2025',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    skills: ['React', 'Python', 'Machine Learning'],
    location: 'Kakinada, India'
  }
];

// ─── Middleware ──────────────────────────────────────────────────────────────
function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  try {
    req.user = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

// ─── Auth Routes ─────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role = 'alumni', department = '', batch = '' } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'Name, email and password are required.' });

    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return res.status(409).json({ error: 'An account with this email already exists.' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: `USR-${Date.now()}`,
      name, email, passwordHash, role, department, batch,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff&size=150`
    };
    users.push(newUser);

    const { passwordHash: _, ...safeUser } = newUser;
    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' });

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user)
      return res.status(401).json({ error: 'Invalid email or password.' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      return res.status(401).json({ error: 'Invalid email or password.' });

    const { passwordHash: _, ...safeUser } = user;
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

app.get('/api/auth/me', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const { passwordHash: _, ...safeUser } = user;
  res.json({ user: safeUser });
});

// ─── Real Alumni CRUD API Routes ─────────────────────────────────────────────
app.get('/api/alumni', (req, res) => {
  const { search = '', branch = 'all', college = 'all' } = req.query;
  let filtered = alumniStore;

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(a => 
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      (a.rollNumber && a.rollNumber.toLowerCase().includes(q)) ||
      (a.company && a.company.toLowerCase().includes(q)) ||
      (a.phone && a.phone.includes(q))
    );
  }

  if (branch && branch !== 'all') {
    filtered = filtered.filter(a => a.branch === branch);
  }

  if (college && college !== 'all') {
    filtered = filtered.filter(a => a.college === college);
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

app.post('/api/alumni', (req, res) => {
  const newAlumnus = {
    ...req.body,
    id: `ALM-${Date.now()}`,
    avatar: req.body.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(req.body.name)}&background=6366f1&color=fff&size=150`
  };
  alumniStore.unshift(newAlumnus);
  res.status(201).json({ success: true, data: newAlumnus });
});

app.put('/api/alumni/:id', (req, res) => {
  const { id } = req.params;
  const idx = alumniStore.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Alumnus not found' });
  alumniStore[idx] = { ...alumniStore[idx], ...req.body };
  res.json({ success: true, data: alumniStore[idx] });
});

app.delete('/api/alumni/:id', (req, res) => {
  const { id } = req.params;
  alumniStore = alumniStore.filter(a => a.id !== id);
  res.json({ success: true, message: 'Alumnus deleted' });
});

// ─── Analytics Summary Route with Real Branch & Placement Metrics ───────────
app.get('/api/analytics/overview', (req, res) => {
  const total = alumniStore.length;
  const activeCount = alumniStore.filter(a => a.status === 'Verified' || !a.status).length;
  const mentorsCount = alumniStore.filter(a => a.availableForMentorship).length;

  // Branch-wise breakdown
  const branchCounts = {};
  alumniStore.forEach(a => {
    const branch = a.branch || 'Unknown';
    branchCounts[branch] = (branchCounts[branch] || 0) + 1;
  });

  // College-wise breakdown
  const collegeCounts = {};
  alumniStore.forEach(a => {
    const college = a.college || 'Unknown';
    collegeCounts[college] = (collegeCounts[college] || 0) + 1;
  });

  res.json({
    totalAlumni: total,
    activeAlumni: activeCount,
    mentors: mentorsCount,
    connections: Math.round(total * 3.5), // estimated student-alumni connections
    branchBreakdown: branchCounts,
    collegeBreakdown: collegeCounts,
    topEngagedAlumni: alumniStore.slice(0, 5)
  });
});

// ─── Events CRUD API ─────────────────────────────────────────────────────────
let eventsStore = [
  {
    _id: 'evt-1', id: 'evt-1',
    name: 'Alumni Tech Summit 2026',
    title: 'Alumni Tech Summit 2026',
    type: 'Conference',
    date: '2026-10-15T10:00:00.000Z',
    location: 'KIET Auditorium',
    description: 'Annual alumni tech summit with industry keynotes and networking.',
    attendeesCount: 80, maxCapacity: 200, status: 'Upcoming',
    participants: [], creator: { name: 'Admin', email: 'admin@alumniconnect.edu' }
  },
  {
    _id: 'evt-2', id: 'evt-2',
    name: 'AI & ML Career Bootcamp',
    title: 'AI & ML Career Bootcamp',
    type: 'Technical Workshop',
    date: '2026-11-05T14:00:00.000Z',
    location: 'Virtual (Zoom)',
    description: 'Hands-on bootcamp on building AI/ML applications for career growth.',
    attendeesCount: 45, maxCapacity: 100, status: 'Upcoming',
    participants: [], creator: { name: 'Admin', email: 'admin@alumniconnect.edu' }
  }
];

app.get('/api/events', (req, res) => {
  const { status } = req.query;
  let result = eventsStore;
  if (status && status !== 'all') {
    result = result.filter(e => e.status?.toLowerCase() === status.toLowerCase());
  }
  res.json({ success: true, count: result.length, data: result });
});

app.post('/api/events', (req, res) => {
  const newEvent = {
    _id: 'evt-' + Date.now(),
    id: 'evt-' + Date.now(),
    attendeesCount: 0, maxCapacity: 100, status: 'Upcoming', participants: [],
    creator: { name: 'Admin', email: 'admin@alumniconnect.edu' },
    ...req.body
  };
  eventsStore.unshift(newEvent);
  res.status(201).json({ success: true, data: newEvent });
});

app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const idx = eventsStore.findIndex(e => e._id === id || e.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Event not found' });
  eventsStore[idx] = { ...eventsStore[idx], ...req.body };
  res.json({ success: true, data: eventsStore[idx] });
});

app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  eventsStore = eventsStore.filter(e => e._id !== id && e.id !== id);
  res.json({ success: true, message: 'Event deleted' });
});

// Health check
app.get('/api/health', (_, res) => res.json({ 
  status: 'ok', 
  realAlumniCount: alumniStore.length, 
  timestamp: new Date().toISOString() 
}));

app.listen(PORT, () => {
  console.log(`✅  AlumniConnect backend running on http://localhost:${PORT}`);
  console.log(`   → Real Alumni records loaded: ${alumniStore.length}`);
});
