import React, { useState, useContext } from "react";
import { AnnouncementContext } from "../context/AnnouncementContext";
import { X } from "lucide-react";

const announcementTypes = [
  { id: "Holiday", label: "Holiday", icon: "🎉", color: "bg-yellow-500" },
  { id: "Exam", label: "Exam Schedule", icon: "📝", color: "bg-red-500" },
  { id: "Event", label: "Event", icon: "🎪", color: "bg-purple-500" },
  { id: "Placement", label: "Placement Drive", icon: "💼", color: "bg-green-500" }
];

function AnnouncementForm({ role, onClose }) {
  const { addAnnouncement } = useContext(AnnouncementContext);
  const [formData, setFormData] = useState({
    type: "Event",
    title: "",
    content: "",
    priority: "normal"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    addAnnouncement({
      ...formData,
      postedBy: role
    });

    onClose();
  };

  const selectedType = announcementTypes.find(t => t.id === formData.type);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${selectedType?.color} rounded-lg flex items-center justify-center text-xl`}>
            {selectedType?.icon}
          </div>
          <h2 className="text-xl font-bold font-heading text-white">
            Post Announcement
          </h2>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-white/70 text-sm mb-2 block">Type</label>
          <div className="grid grid-cols-2 gap-2">
            {announcementTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData({ ...formData, type: type.id })}
                className={`p-3 rounded-lg border text-left transition-all ${
                  formData.type === type.id
                    ? `${type.color} border-transparent text-white`
                    : 'border-white/20 text-white/70 hover:border-white/30'
                }`}
              >
                <span className="mr-2">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-white/70 text-sm mb-2 block">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter announcement title"
            className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
            required
          />
        </div>

        <div>
          <label className="text-white/70 text-sm mb-2 block">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Enter announcement details"
            rows="4"
            className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            required
          />
        </div>

        <div>
          <label className="text-white/70 text-sm mb-2 block">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition-colors"
          >
            <option value="normal">Normal</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Post Announcement
        </button>
      </form>
    </div>
  );
}

export default AnnouncementForm;
