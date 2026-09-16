import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical, 
  CheckCheck, 
  Sparkles, 
  User,
  Clock,
  ShieldCheck,
  GraduationCap,
  BookOpen
} from 'lucide-react';

const initialConversations = [
  {
    id: 'CONV-1',
    name: 'Sarah Jenkins',
    role: 'alumni',
    designation: 'Senior Product Designer @ Stripe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    online: true,
    lastSeen: 'Active now',
    messages: [
      { id: 1, sender: 'them', text: 'Hi Alex! Thanks for reaching out about mentorship. I reviewed your portfolio link.', time: '10:30 AM' },
      { id: 2, sender: 'me', text: 'Thank you Sarah! I really appreciate you taking the time. Would love your feedback on the UX flow.', time: '10:32 AM' },
      { id: 3, sender: 'them', text: 'The typography and component consistency are super clean. Let’s do a 20-min session tomorrow to review the system design.', time: '10:35 AM' }
    ]
  },
  {
    id: 'CONV-2',
    name: 'Vikram Mehta',
    role: 'alumni',
    designation: 'Principal Engineer @ Google',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    online: false,
    lastSeen: '15m ago',
    messages: [
      { id: 1, sender: 'them', text: 'Hey there! Sent your resume to the Google Cloud university hiring team.', time: 'Yesterday' },
      { id: 2, sender: 'me', text: 'Thank you so much Vikram! Fingers crossed for the interview rounds.', time: 'Yesterday' }
    ]
  },
  {
    id: 'CONV-3',
    name: 'Alex Rivera',
    role: 'student',
    designation: 'CS Undergrad (Class of 2025)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    online: true,
    lastSeen: 'Active now',
    messages: [
      { id: 1, sender: 'them', text: 'Hello! I am preparing for the mock interview session on Saturday.', time: 'Sep 12' },
      { id: 2, sender: 'me', text: 'Great! Bring 2 system design scenarios you’d like to run through.', time: 'Sep 12' }
    ]
  }
];

export default function ChatPlatform() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState('CONV-1');
  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    setInputText('');

    // Simulate smart auto-reply
    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        sender: 'them',
        text: `Got your message! Let me check the schedule and confirm. Looking forward to our discussion.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversations(prev => prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            messages: [...c.messages, autoReply]
          };
        }
        return c;
      }));
    }, 1500);
  };

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Student & Alumni Messages</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live Real-Time
            </span>
          </h1>
          <p className="text-xs text-slate-400">Direct 1-on-1 messaging for career mentoring, interview prep, and referral follow-ups</p>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Left sidebar: Contact list */}
        <div className="md:col-span-4 border-r border-slate-800 flex flex-col bg-slate-950/40">
          <div className="p-4 border-b border-slate-800 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
            {filteredConversations.map(conv => {
              const isActive = conv.id === activeConvId;
              const lastMessage = conv.messages[conv.messages.length - 1];
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full p-4 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                    isActive ? 'bg-blue-600/10 border-l-4 border-blue-500' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={conv.avatar} alt={conv.name} className="w-11 h-11 rounded-2xl object-cover border border-slate-700" />
                    {conv.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className={`font-semibold text-xs truncate ${isActive ? 'text-blue-300' : 'text-white'}`}>
                        {conv.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 shrink-0">{lastMessage?.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate font-medium">{conv.designation}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-1">
                      {lastMessage?.sender === 'me' ? 'You: ' : ''}{lastMessage?.text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right panel: Active Chat Window */}
        <div className="md:col-span-8 flex flex-col bg-slate-900/40 justify-between">
          {/* Top Chat Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={activeConv.avatar} alt={activeConv.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                {activeConv.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  {activeConv.name}
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 capitalize">
                    {activeConv.role}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">{activeConv.designation} · <span className="text-emerald-400">{activeConv.lastSeen}</span></p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('Starting voice call...')}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Voice Call"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button 
                onClick={() => alert('Launching Google Meet Video Room...')}
                className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors cursor-pointer"
                title="Video Meeting"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            <div className="text-center my-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-slate-800/80 text-slate-400 border border-slate-700">
                End-to-End Encrypted Mentorship Session
              </span>
            </div>

            {activeConv.messages.map(msg => {
              const isMe = msg.sender === 'me';
              return (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-md shadow-blue-600/20' 
                        : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1 px-1">
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-blue-400" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert('Attachment upload dialog')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input 
              type="text"
              placeholder={`Message ${activeConv.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
