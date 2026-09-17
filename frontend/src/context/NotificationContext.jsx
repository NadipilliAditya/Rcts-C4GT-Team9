import React, { createContext, useContext, useState } from 'react';
import { 
  CheckCircle2, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  Users, 
  Award, 
  UserCheck, 
  Sparkles 
} from 'lucide-react';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  // Shared requests state between Student & Alumni
  const [requests, setRequests] = useState([
    {
      id: 'REQ-101',
      studentName: 'Alex Rivera',
      studentDept: 'Computer Science',
      studentBatch: '2025',
      alumniName: 'Sarah Jenkins',
      topic: 'Frontend Architecture & System Design Mentorship',
      note: 'Hi Sarah! I saw your work at Stripe. I am building fullstack React applications and would love 30 mins of career guidance.',
      date: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      status: 'pending'
    },
    {
      id: 'REQ-102',
      studentName: 'Priya Patel',
      studentDept: 'Information Technology',
      studentBatch: '2026',
      alumniName: 'Vikram Mehta',
      topic: 'Product Design & Portfolio Review',
      note: 'Would love feedback on my Figma design system project for upcoming summer internship applications.',
      date: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      status: 'pending'
    }
  ]);

  // Shared Notifications state across roles
  const [notifications, setNotifications] = useState({
    student: [
      {
        id: 'NOTIF-S1',
        title: 'Mentorship Request Accepted! 🎉',
        desc: 'Sarah Jenkins (Senior Product Designer at Stripe) accepted your 1-on-1 mentorship request.',
        fullMessage: 'Hi Alex! I reviewed your profile and I would be delighted to mentor you on Frontend Architecture & System Design. I have reserved 30 minutes for our 1-on-1 session tomorrow at 5:30 PM (IST). Looking forward to discussing Figma design systems, component tokens, and React patterns!',
        sender: 'Sarah Jenkins',
        senderRole: 'Senior Product Designer at Stripe (Batch of 2018)',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        time: '10 mins ago',
        unread: true,
        actionText: 'Open Chat with Sarah',
        icon: CheckCircle2,
        color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
      },
      {
        id: 'NOTIF-S2',
        title: 'Referral Application Shortlisted 🚀',
        desc: 'Your referral request for Microsoft Fullstack Graduate Trainee was Shortlisted by Vikram Mehta!',
        fullMessage: 'Great news Alex! Vikram Mehta (Software Development Manager at Microsoft) reviewed your referral submission for Fullstack Graduate Trainee and officially marked your application as SHORTLISTED. Microsoft HR will reach out to your registered email address with direct interview steps.',
        sender: 'Vikram Mehta',
        senderRole: 'Software Development Manager at Microsoft',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        time: '2 hours ago',
        unread: true,
        actionText: 'View Referral Board',
        icon: Briefcase,
        color: 'bg-blue-50 text-blue-600 border-blue-200'
      },
      {
        id: 'NOTIF-S3',
        title: 'Upcoming Webinar Alert 📅',
        desc: 'Alumni Tech Talk: "AI/ML Career Roadmap in 2025" starts tomorrow at 5:00 PM (IST).',
        fullMessage: 'Reminder: You are registered for the live alumni webinar "AI & LLM Systems Architecture in 2025" hosted by Dr. Aris Vance (Staff Software Engineer at Google). Session starts tomorrow at 5:00 PM (IST). The live Google Meet room link will activate 10 minutes before start time.',
        sender: 'Dr. Aris Vance',
        senderRole: 'Staff Software Engineer at Google',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        time: '1 day ago',
        unread: true,
        actionText: 'Join Live Room',
        icon: Calendar,
        color: 'bg-purple-50 text-purple-600 border-purple-200'
      }
    ],
    alumni: [
      {
        id: 'NOTIF-A1',
        reqId: 'REQ-101',
        title: 'New Mentorship Request Received 📩',
        desc: 'Alex Rivera (CS 2025) sent a mentorship request for Frontend Architecture & System Design.',
        fullMessage: 'Student Alex Rivera (Computer Science, Class of 2025) has requested a 30-minute 1-on-1 mentorship session with you. Note: "Hi Sarah! I saw your work at Stripe. I am building fullstack React applications and would love 30 mins of career guidance and Figma design system review."',
        sender: 'Alex Rivera',
        senderRole: 'Computer Science Student (Class of 2025)',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        time: '15 mins ago',
        unread: true,
        status: 'pending',
        actionText: 'Review Mentorship Request',
        icon: Users,
        color: 'bg-blue-50 text-blue-600 border-blue-200'
      },
      {
        id: 'NOTIF-A2',
        reqId: 'REQ-102',
        title: 'Portfolio Review Submission 🎨',
        desc: 'Priya Patel (IT 2026) submitted a Figma design system project for your guidance.',
        fullMessage: 'Priya Patel (Information Technology, Class of 2026) submitted a Figma design system project link for your expert feedback ahead of upcoming summer internship applications.',
        sender: 'Priya Patel',
        senderRole: 'Information Technology Student (Class of 2026)',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        time: '1 hour ago',
        unread: true,
        status: 'pending',
        actionText: 'Open Figma Portfolio',
        icon: Award,
        color: 'bg-purple-50 text-purple-600 border-purple-200'
      }
    ],
    admin: [
      {
        id: 'NOTIF-AD1',
        title: 'Pending Verification Approvals 🛡️',
        desc: '5 new alumni user registrations require your manual credential verification.',
        fullMessage: '5 new alumni member signups are pending manual credential verification. Review degree certificates and employment details to grant full platform access.',
        sender: 'Credential Security Engine',
        senderRole: 'Platform Audit Service',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        time: '30 mins ago',
        unread: true,
        actionText: 'Review Pending Approvals',
        icon: UserCheck,
        color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
      }
    ]
  });

  // Shared Chat Conversations state separated by role (Alumni vs Student)
  const [chatConversations, setChatConversations] = useState({
    alumni: [
      {
        id: 'CONV-A1',
        name: 'Alex Rivera',
        role: 'Student',
        email: 'alex.rivera@example.com',
        designation: 'Student • Computer Science 2025',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        initials: 'A',
        online: true,
        lastSeen: 'Active now',
        messages: [
          {
            id: 1,
            sender: 'them',
            text: 'Hi! Thank you for accepting my mentorship request. Excited to learn from you!',
            time: '02:19 PM'
          },
          {
            id: 2,
            sender: 'me',
            text: 'Welcome Alex! Happy to help with Frontend Architecture and Figma design systems.',
            time: '02:20 PM'
          }
        ]
      },
      {
        id: 'CONV-A2',
        name: 'Priya Patel',
        role: 'Student',
        email: 'priya.patel@example.com',
        designation: 'Student • Information Technology 2026',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        initials: 'P',
        online: true,
        lastSeen: 'Active now',
        messages: [
          {
            id: 1,
            sender: 'them',
            text: 'Hi! I submitted my Figma design system for review. Could you take a look when free?',
            time: '01:45 PM'
          }
        ]
      },
      {
        id: 'CONV-A3',
        name: 'Rohan Verma',
        role: 'Student',
        email: 'rohan.verma@example.com',
        designation: 'Student • Computer Science 2025',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        initials: 'R',
        online: true,
        lastSeen: 'Active now',
        messages: [
          {
            id: 1,
            sender: 'them',
            text: 'Hi! Could you review my React resume when you get a chance?',
            time: '11:30 AM'
          }
        ]
      },
      {
        id: 'CONV-A4',
        name: 'Haswanth',
        role: 'Student',
        email: 'haswanth@example.com',
        designation: 'Student • Information Technology 2025',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        initials: 'H',
        online: true,
        lastSeen: 'Active now',
        messages: [
          { id: 1, sender: 'them', text: 'hi', time: '09:49 AM' }
        ]
      }
    ],
    student: [
      {
        id: 'CONV-S1',
        name: 'Sarah Jenkins',
        role: 'Alumni',
        email: 'sarah.jenkins@stripe.com',
        designation: 'Senior Product Designer at Stripe • Alumni Mentor',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        initials: 'S',
        online: true,
        lastSeen: 'Active now',
        messages: [
          {
            id: 1,
            sender: 'me',
            text: 'Hi Sarah! Thank you for accepting my mentorship request. Excited to learn from you!',
            time: '02:19 PM'
          },
          {
            id: 2,
            sender: 'them',
            text: 'Welcome Alex! Happy to help with Frontend Architecture and Figma design systems.',
            time: '02:20 PM'
          }
        ]
      },
      {
        id: 'CONV-S2',
        name: 'Vikram Mehta',
        role: 'Alumni',
        email: 'vikram.mehta@microsoft.com',
        designation: 'Software Development Manager at Microsoft • Alumni Mentor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        initials: 'V',
        online: false,
        lastSeen: '1 hour ago',
        messages: [
          {
            id: 1,
            sender: 'them',
            text: 'Great news Alex! I shortlisted your referral application for Microsoft Fullstack Graduate Trainee.',
            time: '12:00 PM'
          },
          {
            id: 2,
            sender: 'me',
            text: 'Thank you so much Vikram! Looking forward to the next steps.',
            time: '12:05 PM'
          }
        ]
      },
      {
        id: 'CONV-S3',
        name: 'Dr. Aris Vance',
        role: 'Alumni',
        email: 'aris.vance@google.com',
        designation: 'Staff Software Engineer at Google • Platform Mentor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        initials: 'A',
        online: true,
        lastSeen: 'Active now',
        messages: [
          {
            id: 1,
            sender: 'them',
            text: 'Welcome to AlumniConnect! Feel free to reach out for tech career guidance.',
            time: '10:00 AM'
          }
        ]
      }
    ]
  });
  const [activeChatId, setActiveChatId] = useState('CONV-A1');

  // 1. Dispatch Request from Student -> Alumni Dashboard & Notifications
  const sendMentorshipRequest = ({ studentName = 'Alex Rivera', alumniName = 'PAVANI KADARI', topic = '1-on-1 Guidance & Placement Review', note = '' }) => {
    const newReqId = `REQ-${Date.now()}`;

    // Add to requests list so Alumni Dashboard displays it
    const newReq = {
      id: newReqId,
      studentName,
      studentDept: 'Computer Science',
      studentBatch: '2025',
      alumniName,
      topic,
      note: note || `Hi ${alumniName}, I am a student seeking career guidance and placement advice.`,
      date: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      status: 'pending'
    };

    setRequests(prev => [newReq, ...prev]);

    // Add to Alumni Notifications
    const newAlumniNotif = {
      id: `NOTIF-A-${Date.now()}`,
      reqId: newReqId,
      title: 'New Mentorship Request Received 📩',
      desc: `${studentName} sent a 1-on-1 mentorship request to ${alumniName}.`,
      fullMessage: `Student ${studentName} (Computer Science, Class of 2025) sent a mentorship request to ${alumniName}. Note: "${note || 'Seeking career guidance and placement advice.'}"`,
      sender: studentName,
      senderRole: 'Computer Science Student (Class of 2025)',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      time: 'Just now',
      unread: true,
      status: 'pending',
      actionText: 'Review Mentorship Request',
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    };

    setNotifications(prev => ({
      ...prev,
      alumni: [newAlumniNotif, ...(prev.alumni || [])]
    }));

    // Synchronize initial conversation entries for both Student and Alumni
    setChatConversations(prev => {
      const alumniList = prev.alumni || [];
      const studentList = prev.student || [];

      const alumniTargetConvId = `CONV-A-${Date.now()}`;
      const studentTargetConvId = `CONV-S-${Date.now()}`;
      const currentTime = 'Just now';

      const studentConvExists = studentList.find(c => c.name.toLowerCase() === alumniName.toLowerCase());
      const updatedStudentList = studentConvExists ? studentList : [
        {
          id: studentTargetConvId,
          name: alumniName,
          role: 'Alumni',
          email: `${alumniName.toLowerCase().replace(/\s+/g, '.')}@alumniconnect.edu`,
          designation: `${alumniName} • Alumni Mentor`,
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          initials: alumniName.charAt(0).toUpperCase(),
          online: true,
          lastSeen: 'Active now',
          messages: [
            {
              id: Date.now(),
              sender: 'me',
              text: note || `Hi ${alumniName}! I sent a mentorship request.`,
              time: currentTime
            }
          ]
        },
        ...studentList
      ];

      const alumniConvExists = alumniList.find(c => c.name.toLowerCase() === studentName.toLowerCase());
      const updatedAlumniList = alumniConvExists ? alumniList : [
        {
          id: alumniTargetConvId,
          name: studentName,
          role: 'Student',
          email: `${studentName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          designation: `Student • ${studentName}`,
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
          initials: studentName.charAt(0).toUpperCase(),
          online: true,
          lastSeen: 'Active now',
          messages: [
            {
              id: Date.now(),
              sender: 'them',
              text: note || `Hi! Sent a mentorship request.`,
              time: currentTime
            }
          ]
        },
        ...alumniList
      ];

      return {
        alumni: updatedAlumniList,
        student: updatedStudentList
      };
    });
  };

  // 2. Send Chat Message with automatic 2-way cross-sync between Student and Alumni
  const sendChatMessage = ({ text, senderRole = 'student', currentConv, currentUserName = 'g.uma' }) => {
    if (!text || !text.trim() || !currentConv) return;

    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgId = Date.now();

    setChatConversations(prev => {
      const alumniList = Array.isArray(prev.alumni) ? [...prev.alumni] : [];
      const studentList = Array.isArray(prev.student) ? [...prev.student] : [];

      if (senderRole === 'student') {
        // Current sender is STUDENT (e.g. g.uma) sending to ALUMNI (currentConv.name)
        const targetAlumniName = currentConv.name;

        // A. Append message as 'me' in Student's conversation list
        const updatedStudentList = studentList.map(c => {
          if (c.id === currentConv.id || c.name.toLowerCase() === targetAlumniName.toLowerCase()) {
            return {
              ...c,
              messages: [...(c.messages || []), { id: msgId, sender: 'me', text: text.trim(), time: formattedTime }]
            };
          }
          return c;
        });

        // B. Append message as 'them' in Alumni's conversation list for this student
        let alumniFound = false;
        let updatedAlumniList = alumniList.map(c => {
          if (
            c.name.toLowerCase() === currentUserName.toLowerCase() ||
            c.name.toLowerCase().includes(currentUserName.toLowerCase()) ||
            currentUserName.toLowerCase().includes(c.name.toLowerCase())
          ) {
            alumniFound = true;
            return {
              ...c,
              messages: [...(c.messages || []), { id: msgId + 1, sender: 'them', text: text.trim(), time: formattedTime }]
            };
          }
          return c;
        });

        if (!alumniFound) {
          // Create student conversation entry inside alumni list
          updatedAlumniList = [
            {
              id: `CONV-A-${Date.now()}`,
              name: currentUserName,
              role: 'Student',
              email: `${currentUserName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
              designation: `Student • ${currentUserName}`,
              avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
              initials: currentUserName.charAt(0).toUpperCase(),
              online: true,
              lastSeen: 'Active now',
              messages: [{ id: msgId + 1, sender: 'them', text: text.trim(), time: formattedTime }]
            },
            ...alumniList
          ];
        }

        return {
          alumni: updatedAlumniList,
          student: updatedStudentList
        };

      } else {
        // Current sender is ALUMNI (e.g. JOTHSNA PANDRAKI) sending to STUDENT (currentConv.name)
        const targetStudentName = currentConv.name;

        // A. Append message as 'me' in Alumni's conversation list
        const updatedAlumniList = alumniList.map(c => {
          if (c.id === currentConv.id || c.name.toLowerCase() === targetStudentName.toLowerCase()) {
            return {
              ...c,
              messages: [...(c.messages || []), { id: msgId, sender: 'me', text: text.trim(), time: formattedTime }]
            };
          }
          return c;
        });

        // B. Append message as 'them' in Student's conversation list for this alumni
        let studentFound = false;
        let updatedStudentList = studentList.map(c => {
          if (
            c.name.toLowerCase() === currentUserName.toLowerCase() ||
            c.name.toLowerCase().includes(currentUserName.toLowerCase()) ||
            currentUserName.toLowerCase().includes(c.name.toLowerCase())
          ) {
            studentFound = true;
            return {
              ...c,
              messages: [...(c.messages || []), { id: msgId + 1, sender: 'them', text: text.trim(), time: formattedTime }]
            };
          }
          return c;
        });

        if (!studentFound) {
          // Create alumni conversation entry inside student list
          updatedStudentList = [
            {
              id: `CONV-S-${Date.now()}`,
              name: currentUserName,
              role: 'Alumni',
              email: `${currentUserName.toLowerCase().replace(/\s+/g, '.')}@alumniconnect.edu`,
              designation: `${currentUserName} • Alumni Mentor`,
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
              initials: currentUserName.charAt(0).toUpperCase(),
              online: true,
              lastSeen: 'Active now',
              messages: [{ id: msgId + 1, sender: 'them', text: text.trim(), time: formattedTime }]
            },
            ...studentList
          ];
        }

        return {
          alumni: updatedAlumniList,
          student: updatedStudentList
        };
      }
    });
  };

  // 2. Accept Request from Alumni -> Triggers Notification back to Student & Adds to Chat
  const acceptMentorshipRequest = (requestId, alumniName = 'Alumni Mentor') => {
    let targetStudent = 'Alex Rivera';
    let targetAlumni = alumniName;
    let targetAvatar = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150';

    setRequests(prev => prev.map(r => {
      if (r.id === requestId || r.studentName === requestId) {
        targetStudent = r.studentName || 'Alex Rivera';
        if (r.alumniName) targetAlumni = r.alumniName;
        if (r.avatar) targetAvatar = r.avatar;
        return { ...r, status: 'accepted' };
      }
      return r;
    }));

    // Sync status in alumni notifications list
    setNotifications(prev => ({
      ...prev,
      alumni: (prev.alumni || []).map(n => {
        if (n.reqId === requestId || n.sender === targetStudent || n.id === requestId) {
          return { ...n, status: 'accepted', title: 'Mentorship Request Accepted ✓' };
        }
        return n;
      })
    }));

    // Add to Chat Conversations for both Alumni and Student
    setChatConversations(prev => {
      const alumniList = prev.alumni || [];
      const studentList = prev.student || [];

      const alumniConvExists = alumniList.find(c => c.name.toLowerCase() === targetStudent.toLowerCase());
      const newAlumniConvId = alumniConvExists ? alumniConvExists.id : `CONV-A-${Date.now()}`;
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const updatedAlumniList = alumniConvExists 
        ? alumniList 
        : [
            {
              id: newAlumniConvId,
              name: targetStudent,
              role: 'Student',
              email: `${targetStudent.toLowerCase().replace(/\s+/g, '.')}@example.com`,
              designation: `Student • ${targetStudent.toLowerCase().replace(/\s+/g, '.')}@example.com`,
              avatar: targetAvatar,
              initials: targetStudent.charAt(0).toUpperCase(),
              online: true,
              lastSeen: 'Active now',
              messages: [
                {
                  id: Date.now(),
                  sender: 'them',
                  text: `Hi! Thank you for accepting my mentorship request. Excited to learn from you!`,
                  time: currentTime
                },
                {
                  id: Date.now() + 1,
                  sender: 'me',
                  text: `Welcome ${targetStudent}! Happy to help with career guidance and placement advice.`,
                  time: currentTime
                }
              ]
            },
            ...alumniList
          ];

      const studentConvExists = studentList.find(c => c.name.toLowerCase() === targetAlumni.toLowerCase());
      const newStudentConvId = studentConvExists ? studentConvExists.id : `CONV-S-${Date.now()}`;
      const updatedStudentList = studentConvExists 
        ? studentList 
        : [
            {
              id: newStudentConvId,
              name: targetAlumni,
              role: 'Alumni',
              email: `${targetAlumni.toLowerCase().replace(/\s+/g, '.')}@alumniconnect.edu`,
              designation: `${targetAlumni} • Alumni Mentor`,
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
              initials: targetAlumni.charAt(0).toUpperCase(),
              online: true,
              lastSeen: 'Active now',
              messages: [
                {
                  id: Date.now(),
                  sender: 'me',
                  text: `Hi! Thank you for accepting my mentorship request. Excited to learn from you!`,
                  time: currentTime
                },
                {
                  id: Date.now() + 1,
                  sender: 'them',
                  text: `Welcome ${targetStudent}! Happy to help with career guidance and placement advice.`,
                  time: currentTime
                }
              ]
            },
            ...studentList
          ];

      setActiveChatId(newAlumniConvId);

      return {
        alumni: updatedAlumniList,
        student: updatedStudentList
      };
    });

    // Add Notification to Student
    const newStudentNotif = {
      id: `NOTIF-S-${Date.now()}`,
      reqId: requestId,
      title: 'Mentorship Request Accepted! 🎉',
      desc: `${targetAlumni} accepted your 1-on-1 mentorship request.`,
      fullMessage: `Great news ${targetStudent}! ${targetAlumni} has officially accepted your mentorship request. You can now schedule 1-on-1 sessions, join video calls, and communicate directly in the Chat platform!`,
      sender: targetAlumni,
      senderRole: 'Verified Alumni Mentor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      time: 'Just now',
      unread: true,
      status: 'accepted',
      actionText: 'Open Direct Chat',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    };

    setNotifications(prev => ({
      ...prev,
      student: [newStudentNotif, ...(prev.student || [])]
    }));
  };

  // 3. Decline Request
  const declineMentorshipRequest = (requestId) => {
    setRequests(prev => prev.map(r => (r.id === requestId || r.studentName === requestId) ? { ...r, status: 'rejected' } : r));
    setNotifications(prev => ({
      ...prev,
      alumni: (prev.alumni || []).map(n => {
        if (n.reqId === requestId || n.sender === requestId || n.id === requestId) {
          return { ...n, status: 'rejected' };
        }
        return n;
      })
    }));
  };

  // 4. Mark notification read
  const markNotificationRead = (role, id) => {
    setNotifications(prev => ({
      ...prev,
      [role]: (prev[role] || []).map(n => n.id === id ? { ...n, unread: false } : n)
    }));
  };

  // 5. Mark all read for role
  const markAllNotificationsRead = (role) => {
    setNotifications(prev => ({
      ...prev,
      [role]: (prev[role] || []).map(n => ({ ...n, unread: false }))
    }));
  };

  return (
    <NotificationContext.Provider value={{
      requests,
      notifications,
      chatConversations,
      setChatConversations,
      activeChatId,
      setActiveChatId,
      sendMentorshipRequest,
      sendChatMessage,
      acceptMentorshipRequest,
      declineMentorshipRequest,
      markNotificationRead,
      markAllNotificationsRead,
      setNotifications,
      setRequests
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
}

export default NotificationContext;
