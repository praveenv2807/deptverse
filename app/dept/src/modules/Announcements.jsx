import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AnnouncementList from "../components/AnnouncementList";
import AnnouncementForm from "../components/AnnouncementForm";
import { Plus } from "lucide-react";

const filters = [
  { id: "all", label: "All" },
  { id: "Holiday", label: "🎉 Holiday" },
  { id: "Exam", label: "📝 Exam" },
  { id: "Event", label: "🎪 Event" },
  { id: "Placement", label: "💼 Placement" }
];

function Announcements() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  
  const role = location.pathname.includes('faculty') ? 'Faculty'
      : location.pathname.includes('admin') ? 'Admin' : 'Student';

  const canPost = role === 'Admin' || role === 'Faculty';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">📢</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading text-white">
              Announcements
            </h2>
            <p className="text-white/50 text-sm">Stay updated with latest news</p>
          </div>
        </div>
        {canPost && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Post Announcement
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
          <AnnouncementForm role={role} onClose={() => setShowForm(false)} />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800/60 text-white/70 hover:bg-slate-700/60 border border-white/10'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <AnnouncementList filterType={activeFilter === "all" ? null : activeFilter} showActions={canPost} />
    </div>
  );
}

export default Announcements;
