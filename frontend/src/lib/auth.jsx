import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = ''; // Vite proxy forwards /api/* → http://localhost:5000

// ─── Mock profiles for role preview (no backend needed for switching) ─────────
const mockProfiles = {
  admin: {
    id: 'ADMIN-001',
    name: 'Dr. Aris Vance',
    email: 'admin@alumniconnect.edu',
    role: 'admin',
    department: 'Computer Science',
    company: 'Google',
    designation: 'Staff Engineer & Admin',
    batch: '2016',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  alumni: {
    id: 'ALM-102',
    name: 'Sarah Jenkins',
    email: 's.jenkins@mckinsey.com',
    role: 'alumni',
    department: 'Business Admin',
    company: 'McKinsey & Co',
    designation: 'Engagement Manager',
    batch: '2018',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  student: {
    id: 'STU-201',
    name: 'Alex Rivera',
    email: 'arivera@student.edu',
    role: 'student',
    department: 'Computer Science',
    batch: '2025',
    gpa: '3.85',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
  }
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('admin');
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On mount, verify stored token
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(({ user: u }) => {
          setUser(u);
          setRole(u.role);
          setIsAuthenticated(true);
          setToken(storedToken);
        })
        .catch(() => {
          localStorage.removeItem('authToken');
          setToken(null);
          setIsAuthenticated(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      // No token — start as guest (show sign-in)
      setIsLoading(false);
    }
  }, []);

  // ─── Real login ──────────────────────────────────────────────────────────
  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    localStorage.setItem('authToken', data.token);
    setToken(data.token);
    setUser(data.user);
    setRole(data.user.role);
    setIsAuthenticated(true);
    return data.user;
  };

  // ─── Real register ───────────────────────────────────────────────────────
  const register = async (name, email, password, extraFields = {}) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, ...extraFields })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');

    localStorage.setItem('authToken', data.token);
    setToken(data.token);
    setUser(data.user);
    setRole(data.user.role);
    setIsAuthenticated(true);
    return data.user;
  };

  // ─── Logout ──────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setRole('admin');
  };

  // ─── Mock role switch (for demo / testing purposes) ──────────────────────
  const switchRole = (newRole) => {
    if (mockProfiles[newRole]) {
      setRole(newRole);
      // When switching roles in demo mode, show mock profile but keep real auth
      if (!isAuthenticated) setUser(mockProfiles[newRole]);
    }
  };

  // Use real user when authenticated, else mock for role preview
  const displayUser = isAuthenticated ? user : (mockProfiles[role] || mockProfiles.admin);

  return (
    <AuthContext.Provider value={{
      user: displayUser,
      role,
      token,
      isAuthenticated,
      isLoading,
      login,
      logout,
      register,
      switchRole,
      mockProfiles,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export default AuthContext;
