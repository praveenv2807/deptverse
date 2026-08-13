import React, { useState } from "react";
import { X, Calendar, FileText, PartyPopper, Briefcase } from "lucide-react";

const typeOptions = [
  { id: "Holiday", label: "Holiday", icon: "🎉" },
  { id: "Exam", label: "Exam Schedule", icon: "📝" },
  { id: "Event", label: "Event", icon: "🎪" },
  { id: "Placement", label: "Placement Drive", icon: "💼" },
];

export default function AnnouncementForm({ role, onClose, onSuccess }) {
  const [selectedType, setSelectedType] = useState("Event");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("Normal");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content!");
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      title: title.trim(),
      category: selectedType, // Matches "Holiday", "Exam", "Event", "Placement"
      content: content.trim(),
      isUrgent: priority === "Urgent" || priority === "High",
      postedBy: role || "Admin",
      date: new Date().toISOString().split("T")[0],
    };

    // Save to local storage
    try {
      const existing = JSON.parse(
        localStorage.getItem("dept_announcements") || "[]",
      );
      localStorage.setItem(
        "dept_announcements",
        JSON.stringify([newAnnouncement, ...existing]),
      );
    } catch (err) {
      console.error("Failed to save announcement:", err);
    }

    // Reset inputs & close/refresh parent
    setTitle("");
    setContent("");
    if (onSuccess) onSuccess();
  };

  return (
    <div className="relative overflow-hidden bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-xl">
            🎪
          </div>
          <h3 className="text-xl font-bold text-white font-heading">
            Post Announcement
          </h3>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Type Options Grid */}
        <div>
          <label className="text-sm text-white/70 block mb-2 font-medium">
            Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {typeOptions.map((opt) => {
              const isSelected = selectedType === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedType(opt.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left font-medium ${
                    isSelected
                      ? "bg-purple-600/90 text-white border-purple-400 shadow-lg shadow-purple-500/20"
                      : "bg-slate-800/40 text-white/80 border-white/10 hover:bg-slate-800/70"
                  }`}
                >
                  <span className="text-lg">{opt.icon}</span>
                  <span className="text-sm">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title Input */}
        <div>
          <label className="text-sm text-white/70 block mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter announcement title"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors text-sm"
            required
          />
        </div>

        {/* Content Input */}
        <div>
          <label className="text-sm text-white/70 block mb-2 font-medium">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter announcement details"
            rows="3"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
            required
          />
        </div>

        {/* Priority Dropdown */}
        <div>
          <label className="text-sm text-white/70 block mb-2 font-medium">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm cursor-pointer"
          >
            <option value="Normal" className="bg-slate-900 text-white">
              Normal
            </option>
            <option value="Urgent" className="bg-slate-900 text-white">
              Urgent
            </option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-3 text-sm rounded-lg transition-all shadow-md shadow-blue-600/30"
        >
          Post Announcement
        </button>
      </form>
    </div>
  );
}
