import React, { useState, useEffect } from "react";
import { Send, X, GraduationCap } from "lucide-react";
import Logo from "./Logo";

function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (open && loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setMessages([
          { text: "Hello! I'm your AI assistant. How can I help you today?", sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [open, loading]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "I'm here to help! Could you please provide more details?";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("leave"))
        reply = "You can apply for leave from the Leave Request section in your student portal.";
      else if (lowerInput.includes("od"))
        reply = "OD requests can be submitted from the OD Request page.";
      else if (lowerInput.includes("result") || lowerInput.includes("marks"))
        reply = "Your results are available in the Results section of the dashboard.";
      else if (lowerInput.includes("timetable") || lowerInput.includes("schedule"))
        reply = "You can view your timetable in the Timetable section.";
      else if (lowerInput.includes("attendance"))
        reply = "Check your attendance records in the Attendance section.";
      else if (lowerInput.includes("hello") || lowerInput.includes("hi"))
        reply = "Hello! How can I assist you today?";
      else if (lowerInput.includes("thank"))
        reply = "You're welcome! Let me know if you need anything else.";

      const botMsg = { text: reply, sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };0

  return (
    <>
      {/* Chat Button */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-primary-dark transition-colors z-40"
      >
        {open ? <X className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-xl shadow-card overflow-hidden border border-slate-200 z-40">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <h3 className="text-white font-semibold">AI Assistant</h3>
              <p className="text-white/70 text-xs">Online</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === "user" 
                        ? "bg-primary text-white rounded-br-sm" 
                        : "bg-white text-slate-700 rounded-bl-sm shadow-card"
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-white/60" : "text-slate-400"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-card flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input Area */}
          {!loading && (
            <div className="p-3 border-t border-slate-200">
              <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
                <input
                  className="flex-1 bg-transparent text-secondary outline-none text-sm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendMessage}
                  className="bg-primary p-2 rounded-full hover:bg-primary-dark transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AIChatbot;
