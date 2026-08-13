import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";

// Expanded CSE Department Knowledge Base
const faqs = [
  // 1. Greetings & Chatbot Scope
  {
    keywords: [
      "hi",
      "hello",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
      "who are you",
      "help",
    ],
    q: "Greetings & Bot Info",
    a: "Hello! 👋 I am DeptBot, your CSE AI Assistant. Ask me about CSE courses, exam results, attendance, labs, faculty, or placements!",
  },

  // 2. Department Overview & Programs
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
      "intake",
      "seats",
      "syllabus",
    ],
    q: "What programs does the CSE department offer?",
    a: "We offer B.E. CSE (4 Years - 180 seats), M.E. CSE (2 Years - 18 seats), and Ph.D. Research Programs in Computer Science.",
  },

  // 3. Results & IA Marks
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

  // 4. Attendance Tracking
  {
    keywords: [
      "attendance",
      "present",
      "absent",
      "percentage",
      "bunk",
      "shortage",
      "eligibility",
    ],
    q: "Where can I check my CSE attendance?",
    a: "Your subject-wise attendance and overall percentage are live-updated under the 'Attendance' section. Minimum 75% is required for exams.",
  },

  // 5. Timetable & Schedule
  {
    keywords: [
      "timetable",
      "schedule",
      "class",
      "lecture",
      "period",
      "routine",
      "timing",
    ],
    q: "Where is my CSE class timetable?",
    a: "Click on 'Timetable' in the sidebar menu to view your daily lecture slots, practical labs, and faculty allocations.",
  },

  // 6. Leave & On-Duty (OD)
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
      "event od",
    ],
    q: "How do I apply for Leave or OD in CSE?",
    a: "Navigate to 'Leave Request' or 'OD Request' in your portal sidebar → Select dates and enter your reason → Submit for Class Advisor approval.",
  },

  // 7. CSE Labs & Infrastructure
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
    a: "We have 10+ advanced labs: AI & ML Lab, Cloud Computing Lab, Cyber Security Lab, IoT Lab, Data Analytics Lab, and Full-Stack Dev Lab.",
  },

  // 8. CSE Wi-Fi & Internet
  {
    keywords: [
      "wifi",
      "internet",
      "password",
      "network",
      "connect",
      "lab wifi",
    ],
    q: "How do I connect to CSE Department Wi-Fi?",
    a: "Select the 'DeptVerse_CSE' network. Log in using your Register/Roll Number as username. Visit Lab 3 System Admin for password resets.",
  },

  // 9. Department Library
  {
    keywords: [
      "library",
      "department library",
      "books",
      "journal",
      "ieee",
      "borrow",
      "reading room",
    ],
    q: "Does CSE have a department library?",
    a: "Yes! The CSE Department Library (Room 104) offers 2,000+ reference books, IEEE journals, and past project reports from 8:30 AM to 5:00 PM.",
  },

  // 10. Fee Status & Dues
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
      "fine",
    ],
    q: "How do I check my CSE fee status?",
    a: "Click on 'Fee Status' in the portal sidebar to view tuition balance, lab fees, paid transaction history, and downloadable receipts.",
  },

  // 11. HOD & Faculty Directory
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
      "mentor",
    ],
    q: "How can I contact CSE HOD or Faculty?",
    a: "Contact HOD at hod.cse@deptverse.edu or visit Block A, Room 101. Faculty contact details are listed under 'Faculty Directory'.",
  },

  // 12. Placements & Career
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
      "campus drive",
    ],
    q: "How are CSE department placements?",
    a: "CSE boasts a 95%+ placement record! Top recruiters include TCS, Infosys, Wipro, Accenture, Zoho, Cognizant, and product startups.",
  },

  // 13. Department Association & Events
  {
    keywords: [
      "association",
      "symposium",
      "workshop",
      "event",
      "hackathon",
      "club",
      "coding club",
      "tech fest",
    ],
    q: "What student activities/clubs are in CSE?",
    a: "CSE hosts the 'ACE' Student Association, Open-Source Coding Club, Cyber Club, and annual National Technical Symposiums/Hackathons.",
  },

  // 14. Projects & Research
  {
    keywords: [
      "project",
      "final year project",
      "mini project",
      "guide",
      "research",
      "paper",
      "publication",
    ],
    q: "Where do I submit my CSE project proposal?",
    a: "Project reviews and guide assignments are managed through your Project Coordinator. Check 'Announcements' for submission deadlines.",
  },

  // 15. Department Announcements
  {
    keywords: [
      "announcement",
      "notice",
      "news",
      "update",
      "circular",
      "holiday",
      "holidays",
      "vacation",
      "working day",
      "off",
      "leave calendar",
    ],
    q: "Where can I view official CSE announcements?",
    a: "All official department circulars, holiday notices, upcoming guest lectures, and exam timetables are posted in real time under the 'Announcements' tab.",
  },
  {
    keywords: [
      "hi",
      "hello",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
      "who are you",
      "help",
      "start",
    ],
    q: "Greetings & Bot Info",
    a: "Hello! 👋 I am DeptBot, your official CSE Department AI Assistant. Ask me about CSE courses, exam results, attendance, labs, faculty directory, placements, OD requests, projects, or certifications!",
  },

  // 2. Department Overview & Programs
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
      "intake",
      "seats",
      "syllabus",
      "accreditation",
      "nba",
      "naac",
    ],
    q: "What programs does the CSE department offer?",
    a: "The CSE Department offers: 1) B.E. CSE (4 Years - 180 seats), 2) M.E. CSE (2 Years - 18 seats), and 3) Ph.D. Research Programs. The department is NBA accredited and NAAC A++ recognized.",
  },

  // 3. Results, Marks & Grading
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
      "ia3",
      "exam",
      "score",
      "gpa",
      "cgpa",
      "arrear",
      "revaluation",
    ],
    q: "Where can I view my CSE IA results & grades?",
    a: "Your Internal Assessment (IA-1, IA-2) marks and semester CGPA are published under the 'Results' tab on your dashboard. For paper revaluation or arrear exam details, contact the CSE Exam Cell.",
  },

  // 4. Attendance & Shortage Rules
  {
    keywords: [
      "attendance",
      "present",
      "absent",
      "percentage",
      "bunk",
      "shortage",
      "eligibility",
      "75",
      "condonation",
    ],
    q: "Where can I check my CSE attendance?",
    a: "Track subject-wise attendance live under the 'Attendance' tab. Minimum 75% attendance is required to sit for semester end-exams. Between 65-74% requires medical condonation approval.",
  },

  // 5. Timetable & Schedule
  {
    keywords: [
      "timetable",
      "schedule",
      "class",
      "lecture",
      "period",
      "routine",
      "timing",
      "hour",
      "slot",
    ],
    q: "Where is my CSE class timetable?",
    a: "Click on 'Timetable' in the sidebar to view your daily schedule, lecture slots, lab rotations, and assigned faculty.",
  },

  // 6. Leave & On-Duty (OD) Requests
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
      "event od",
      "symposium od",
      "sports od",
    ],
    q: "How do I apply for Leave or OD in CSE?",
    a: "Go to 'Leave Request' or 'OD Request' in the sidebar → Pick your dates & upload proof/reason → Submit for Class Advisor and HOD digital approval.",
  },

  // 7. CSE Labs & Coordinators
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
      "networks",
      "data structures lab",
      "python lab",
    ],
    q: "What CSE labs are available?",
    a: "CSE features 10+ high-tech labs: 1) AI & ML Lab, 2) Cloud Computing Lab, 3) Cyber Security Lab, 4) IoT & Embedded Lab, 5) Full-Stack Web Dev Lab, and 6) Open Source Software Lab.",
  },

  // 8. CSE Wi-Fi & Technical Support
  {
    keywords: [
      "wifi",
      "internet",
      "password",
      "network",
      "connect",
      "lab wifi",
      "ethernet",
      "ip address",
      "system admin",
    ],
    q: "How do I connect to CSE Department Wi-Fi?",
    a: "Connect to 'DeptVerse_CSE' SSID using your Student Register Number as username. For password resets or IP issues, visit the System Admin in CSE Lab 3.",
  },

  // 9. Department Library & IEEE Access
  {
    keywords: [
      "library",
      "department library",
      "books",
      "journal",
      "ieee",
      "borrow",
      "reading room",
      "e-books",
      "access",
    ],
    q: "Does CSE have a department library?",
    a: "Yes! The CSE Department Library (Room 104) has 2,500+ reference books, IEEE Digital Library access, and previous year project reports. Open 8:30 AM – 5:00 PM.",
  },

  // 10. Fee Status & Online Receipts
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
      "fine",
      "exam fee",
      "lab fee",
    ],
    q: "How do I check my CSE fee status?",
    a: "Open the 'Fee Status' tab to view paid receipts, pending tuition/lab dues, exam fees, and download official payment receipts.",
  },

  // 11. HOD, Faculty Directory & Mentorship
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
      "mentor",
      "tutor",
      "cab",
    ],
    q: "How can I contact CSE HOD or Faculty Advisors?",
    a: "HOD Office: Block A, Room 101 | Email: hod.cse@deptverse.edu. For faculty office hours and class advisor details, visit the 'Faculty Directory' section.",
  },

  // 12. Placements, Internships & Packages
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
      "campus drive",
      "ctc",
      "zoho",
      "tcs",
      "wipro",
    ],
    q: "How are CSE department placements?",
    a: "CSE has a 95%+ placement record with average packages of 4.5 – 12 LPA. Major recruiters include TCS, Infosys, Wipro, Accenture, Zoho, Cognizant, and Tech Mahindra.",
  },

  // 13. Student Clubs, Associations & Events
  {
    keywords: [
      "association",
      "symposium",
      "workshop",
      "event",
      "hackathon",
      "club",
      "coding club",
      "tech fest",
      "ace",
      "csi",
      "ieee student branch",
    ],
    q: "What student clubs & activities exist in CSE?",
    a: "We run the 'ACE' (Association of Computer Engineers), Competitive Coding Club, Cyber Security Guild, CSI Student Chapter, and host annual National Hackathons.",
  },

  // 14. Projects, Seminars & Research Papers
  {
    keywords: [
      "project",
      "final year project",
      "mini project",
      "guide",
      "research",
      "paper",
      "publication",
      "review",
      "ppt",
      "abstract",
    ],
    q: "Where do I submit my CSE project proposal?",
    a: "Project abstracts, guide selection, and zero-review PPTs are managed via the 'My Requests' tab. Check 'Announcements' for submission deadlines.",
  },

  // 15. Free Certifications & Skill Development
  {
    keywords: [
      "nptel",
      "coursera",
      "certification",
      "credit",
      "value added",
      "course",
      "skill",
      "aws",
      "cisco",
      "redhat",
    ],
    q: "Does CSE offer value-added certifications?",
    a: "Yes! Students can earn credits via NPTEL/SWAYAM, AWS Cloud Foundations, Cisco CCNA, RedHat Linux, and Oracle Java certification drives.",
  },

  // 16. Department Announcements & Circulars
  {
    keywords: [
      "announcement",
      "notice",
      "news",
      "update",
      "circular",
      "holiday",
      "holidays",
      "vacation",
      "working day",
      "off",
      "calendar",
    ],
    q: "Where can I view official CSE announcements?",
    a: "All official department notices, exam schedules, workshop alerts, and academic holiday circulars are published live under the 'Announcements' tab.",
  },

  // 17. Electives & Fast-Track Scheme
  {
    keywords: [
      "elective",
      "electives",
      "fasttrack",
      "fast track",
      "professional elective",
      "open elective",
      "honors",
      "minors",
    ],
    q: "How do I choose my professional electives?",
    a: "Elective registration opens at the start of Semesters 5, 6, and 7 under the 'Elective Selection' portal tab. Fast-track options are open for high CGPA (>8.0) students.",
  },

  // 18. Portal Login & Password Issues
  {
    keywords: [
      "login",
      "password",
      "reset",
      "forgot",
      "error",
      "account",
      "profile",
      "bug",
      "portal problem",
    ],
    q: "What if I face portal login issues?",
    a: "If you are locked out or need a password reset, visit the Department System Administrator in Room 103 or contact support@deptverse.edu.",
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
        : `I couldn't find a CSE-specific answer for "${userQuery}". Try asking about Results, CSE Labs, Attendance, HOD Contact, Fees, or Placements!`;

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
              "Wi-Fi",
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
