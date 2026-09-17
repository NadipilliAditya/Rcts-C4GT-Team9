import React, { useState } from 'react';
import Header from '../../components/admin/Header';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../lib/auth';
import { 
  Search, 
  Send, 
  MessageSquare, 
  RefreshCw,
  User,
  CheckCheck,
  Menu
} from 'lucide-react';

export default function ChatPlatform({ onBack, onToggleSidebar }) {
  const { user, role } = useAuth();
  const { 
    chatConversations, 
    setChatConversations, 
    sendChatMessage,
    activeChatId, 
    setActiveChatId 
  } = useNotifications();

  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');

  // Fallback initial lists if context is uninitialized
  const defaultAlumniConvs = [
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
  ];

  const defaultStudentConvs = [
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
  ];

  // Role-based list selection
  const activeRoleKey = role === 'student' ? 'student' : 'alumni';
  const roleConvs = (chatConversations && Array.isArray(chatConversations[activeRoleKey])) 
    ? chatConversations[activeRoleKey] 
    : (activeRoleKey === 'student' ? defaultStudentConvs : defaultAlumniConvs);

  const currentActiveId = activeChatId || (roleConvs[0] && roleConvs[0].id);
  const activeConv = roleConvs.find(c => c.id === currentActiveId) || roleConvs[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    if (sendChatMessage) {
      sendChatMessage({
        text: inputText.trim(),
        senderRole: role === 'student' ? 'student' : 'alumni',
        currentConv: activeConv,
        currentUserName: user?.name || (role === 'student' ? 'g.uma' : 'JOTHSNA PANDRAKI')
      });
    }

    setInputText('');
  };

  const filteredConversations = roleConvs.filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.designation?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-w-0 bg-[#f8fafc] pb-12 min-h-screen flex flex-col">
      {/* Top Header matching Design */}
      <div className="bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onToggleSidebar) onToggleSidebar();
              if (onBack) onBack();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200/80 shadow-xs shrink-0"
            title="Toggle Navigation Sidebar / Back to Dashboard"
          >
            <Menu className="w-5 h-5 text-slate-800" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {role === 'student' ? 'Student Messages' : 'Alumni Messages'}
              </h1>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                role === 'student' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-purple-100 text-purple-800 border border-purple-300'
              }`}>
                {role === 'student' ? 'Student Portal' : 'Alumni Portal'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {role === 'student' 
                ? 'Direct 1-on-1 real-time chat with your connected alumni mentors.' 
                : 'Direct 1-on-1 real-time chat with your accepted student mentees.'}
            </p>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex-1 flex flex-col">
        {/* Main Chat Box Container */}
        <div className="flex-1 min-h-[640px] grid grid-cols-1 md:grid-cols-12 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
          
          {/* Left column: Contact list */}
          <div className="md:col-span-4 border-r border-slate-200 flex flex-col bg-white">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder={role === 'student' ? "Search alumni mentors..." : "Search student mentees..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                />
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 px-4 flex items-center justify-between">
              <span>{role === 'student' ? 'Connected Alumni Mentors' : 'Connected Student Mentees'}</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-extrabold">
                {filteredConversations.length} Active
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">No active conversations found</div>
              ) : (
                filteredConversations.map(conv => {
                  const isActive = activeConv && conv.id === activeConv.id;
                  const lastMsg = conv.messages && conv.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null;
                  const initials = conv.initials || conv.name?.charAt(0).toUpperCase() || 'U';

                  return (
                    <button
                      key={conv.id}
                      onClick={() => setActiveChatId(conv.id)}
                      className={`w-full p-3.5 flex items-center gap-3 text-left rounded-xl transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' 
                          : 'hover:bg-slate-50 text-slate-900'
                      }`}
                    >
                      {/* Circle Badge Avatar */}
                      <div className="relative shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                          isActive 
                            ? 'bg-purple-500 text-white border-2 border-purple-400' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {initials}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-bold text-xs truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                            {conv.name}
                          </h4>
                          {lastMsg && (
                            <span className={`text-[10px] shrink-0 font-medium ${isActive ? 'text-purple-200' : 'text-slate-400'}`}>
                              {lastMsg.time}
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] truncate mt-0.5 font-medium ${
                          isActive ? 'text-purple-100' : 'text-slate-400'
                        }`}>
                          {lastMsg ? (lastMsg.sender === 'me' ? 'You: ' : '') + lastMsg.text : (conv.designation || 'Start conversation...')}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right panel: Active Chat Window */}
          <div className="md:col-span-8 flex flex-col bg-white justify-between">
            {/* Top Chat Header */}
            {activeConv && (
              <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {activeConv.initials || activeConv.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {activeConv.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {activeConv.designation || `${activeConv.role || 'User'} • ${activeConv.email || 'user@example.com'}`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Feed or Empty State */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col justify-start items-stretch">
              {(!activeConv?.messages || activeConv.messages.length === 0) ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center text-center my-auto p-8">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300 mb-3">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">No messages yet</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Send a greeting to start your conversation!
                  </p>
                </div>
              ) : (
                /* Message feed when messages exist */
                <div className="w-full space-y-3.5 my-0">
                  {activeConv.messages.map(msg => {
                    const isMe = msg.sender === 'me';
                    return (
                      <div 
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div 
                          className={`max-w-md px-4 py-3 rounded-2xl text-xs font-medium leading-relaxed ${
                            isMe 
                              ? 'bg-purple-600 text-white rounded-tr-none shadow-xs' 
                              : 'bg-slate-100 text-slate-800 rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1 font-semibold">
                          {msg.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
              <input 
                type="text"
                placeholder="Type your message... (Press Enter to send)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>

          </div>
        </div>
      </main>
    </div>
  );
}
