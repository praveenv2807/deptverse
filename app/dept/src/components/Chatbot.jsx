import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";

// CSE Department-Only Knowledge Base
const faqs = [
  // Greetings
  {
    keywords: [
      "hi",
      "hello",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
      "help",
    ],
    q: "Greetings",
    a: "Hello! 👋 Welcome to the CSE Department AI Assistant. How can I help you today?",
  },
  // Academics & Exams
  {
    keywords: [
      "result",
      "results",
      "mark",
      "marks",
      "grade",
      "ia",
      "internal",
      "ia1",
      "ia2",
      "exam",
      "score",
      "gpa",
      "cgpa",
    ],
    q: "Where can I view my CSE IA results?",
    a: "Your CSE Internal Assessment (IA-1 & IA-2) marks and semester grades are published under the 'Results' tab on your portal dashboard.",
  },
  {
    keywords: [
      "attendance",
      "present",
      "absent",
      "percentage",
      "bunk",
      "shortage",
    ],
    q: "Where can I check my CSE attendance?",
    a: "Your CSE subject-wise attendance logs and overall percentage are live-tracked under the 'Attendance' section in your sidebar menu.",
  },
  {
    keywords: [
      "timetable",
      "schedule",
      "class",
      "lecture",
      "period",
      "routine",
    ],
    q: "Where is my CSE class timetable?",
    a: "Click on the 'Timetable' tab in the sidebar to view your daily CSE theory classes, lab slots, and faculty allocations.",
  },
  {
    keywords: [
      "holiday",
      "holidays",
      "vacation",
      "working day",
      "off",
      "leave calendar",
    ],
    q: "Are there any department holidays?",
    a: "Official CSE academic notices and holiday announcements are posted under the 'Announcements' tab on your portal sidebar.",
  },
  {
    keywords: [
      "leave",
      "apply leave",
      "permission",
      "absence",
      "sick",
      "od",
      "on duty",
      "medical",
    ],
    q: "How do I apply for leave or OD in CSE?",
    a: "Go to 'Leave Request' or 'OD Request' in your sidebar → Fill in dates & reason → Submit for CSE Class Advisor / HOD approval.",
  },

  // CSE Department Infrastructure & Labs
  {
    keywords: [
      "lab",
      "labs",
      "facility",
      "computer",
      "hardware",
      "software",
      "ai lab",
      "iot",
      "cloud",
      "systems",
    ],
    q: "What CSE labs are available?",
    a: "The CSE Department features 10+ state-of-the-art labs: AI & Machine Learning Lab, Cloud Computing Lab, Cyber Security Lab, IoT Lab, and Full-Stack Dev Lab.",
  },
  {
    keywords: ["wifi", "internet", "password", "network", "lab wifi"],
    q: "How do I connect to CSE Wi-Fi?",
    a: "Connect to 'DeptVerse_CSE' Wi-Fi using your Roll Number as your username. For password resets, visit the Systems Admin in CSE Lab 3.",
  },
  {
    keywords: ["library", "department library", "books", "journal", "ieee"],
    q: "Does CSE have a department library?",
    a: "Yes! The CSE Department Library (Room 104) has over 2,000+ reference books, IEEE journals, and project archives available from 8:30 AM to 5:00 PM.",
  },

  // Fees & Admin
  {
    keywords: [
      "fee",
      "fees",
      "dues",
      "payment",
      "tuition",
      "receipt",
      "paid",
      "balance",
    ],
    q: "How do I check my CSE fee status?",
    a: "Click on the 'Fee Status' tab in your portal navigation to see paid receipts, tuition dues, and pending lab/department fees.",
  },
  {
    keywords: [
      "hod",
      "contact",
      "head",
      "office",
      "room",
      "email",
      "faculty",
      "staff",
      "advisor",
    ],
    q: "How can I contact CSE HOD or Faculty?",
    a: "Contact HOD at hod.cse@deptverse.edu or visit Block A, Room 101. Faculty emails and office hours are listed under 'Faculty Directory'.",
  },
  {
    keywords: [
      "program",
      "course",
      "degree",
      "offer",
      "be",
      "me",
      "phd",
      "curriculum",
      "syllabus",
    ],
    q: "What programs does the CSE department offer?",
    a: "We offer B.E. Computer Science & Engineering (4 Years), M.E. CSE (2 Years), and Ph.D. Research Programs in CSE.",
  },
  {
    keywords: [
      "place",
      "placement",
      "recruiter",
      "company",
      "salary",
      "job",
      "package",
      "internship",
    ],
    q: "How are CSE department placements?",
    a: "The CSE Department maintains a 95%+ placement rate! Top tech recruiters include TCS, Infosys, Wipro, Accenture, ZoHo, and product startups.",
  },
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! 👋 I'm DeptBot, your CSE AI Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  // Smooth scroll to bottom whenever messages update
  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userQuery = text.trim();

    const newMessages = [
      ...messages,
      { from: "user", text: userQuery, time: currentTime },
    ];
    setMessages(newMessages);
    setInput("");

    const cleanQuery = userQuery.toLowerCase().trim();

    // Exact keyword or intent lookup
    const matchedFaq = faqs.find(
      (f) =>
        f.keywords.some(
          (kw) => cleanQuery.includes(kw) || kw.includes(cleanQuery),
        ) || f.q.toLowerCase().includes(cleanQuery),
    );

    // Bot response delay
    setTimeout(() => {
      const botResponse = matchedFaq
        ? matchedFaq.a
        : `I couldn't find a CSE-specific answer for "${userQuery}". Try asking about Results, CSE Labs, Attendance, HOD Contact, or Placements!`;

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
          aria-label="Open CSE Assistant"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="font-semibold text-sm pr-1">CSE Assistant</span>
        </button>
      )}

      {/* Chatbot Window Container */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-0 sm:right-0 w-full sm:w-[380px] h-[100dvh] sm:h-[520px] max-h-[100dvh] sm:max-h-[85vh] bg-slate-900 text-white border border-slate-700/60 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto">
          {/* Header */}
          <div className="h-[60px] bg-slate-800 px-4 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600/30 border border-blue-500/40 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm leading-tight">
                  CSE DeptBot
                </h4>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  CSE AI Assistant
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll View */}
          <div
            ref={chatContainerRef}
            className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-slate-900/90"
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed break-words ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-800 border border-white/10 text-slate-100 rounded-bl-none shadow-md"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-white/40 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* CSE Quick Suggestion Chips */}
          <div className="h-[45px] px-3 border-t border-white/5 bg-slate-950/80 flex gap-2 items-center overflow-x-auto shrink-0 no-scrollbar">
            {[
              "Results",
              "CSE Labs",
              "Attendance",
              "Leave",
              "Placements",
              "Contact HOD",
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-[11px] bg-white/10 hover:bg-white/20 active:bg-blue-600 text-white/90 px-3 py-1 rounded-full whitespace-nowrap border border-white/10 shrink-0 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Control Bar */}
          <div className="h-[65px] p-3 border-t border-white/10 bg-slate-900 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about CSE labs, marks, attendance..."
              className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
