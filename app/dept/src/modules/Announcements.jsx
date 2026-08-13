import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AnnouncementList from "../components/AnnouncementList";
import AnnouncementForm from "../components/AnnouncementForm";
import { Plus } from "lucide-react";

const filters = [
  { id: "all", label: "All" },
  { id: "Holiday", label: "🎉 Holiday" },
  { id: "Exam", label: "📝 Exam" },
  { id: "Event", label: "🎪 Event" },
  { id: "Placement", label: "💼 Placement" },
];

function Announcements() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Trigger live list updates
  const { user } = useAuth();

  // Normalize role
  const userRole = user?.role ? user.role.toLowerCase() : "student";

  // STRICT CHECK: Only Admin, Faculty, or HOD can post!
  const canPost =
    userRole === "admin" || userRole === "faculty" || userRole === "hod";

  // Callback function when a new announcement is posted
  const handleAnnouncementPosted = () => {
    setShowForm(false); // Close the form
    setRefreshKey((prev) => prev + 1); // Instantly update the AnnouncementList feed
  };

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
            <p className="text-white/50 text-sm">
              {canPost
                ? "Post and manage department updates"
                : "Stay updated with latest news"}
            </p>
          </div>
        </div>

        {/* 🔒 ONLY RENDERED FOR ADMIN / FACULTY / HOD */}
        {canPost && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-lg"
          >
            <Plus className="w-4 h-4" />
            {showForm ? "Close Form" : "Post Announcement"}
          </button>
        )}
      </div>

      {/* 🔒 FORM ONLY SHOWN IF USER IS ALLOWED */}
      {canPost && showForm && (
        <AnnouncementForm
          role={userRole === "faculty" ? "Faculty" : "Admin"}
          onClose={() => setShowForm(false)}
          onSuccess={handleAnnouncementPosted}
        />
      )}

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? "bg-blue-500 text-white shadow-md"
                : "bg-slate-800/60 text-white/70 hover:bg-slate-700/60 border border-white/10"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Passing key={refreshKey} forces AnnouncementList to re-render with fresh data */}
      <AnnouncementList
        key={refreshKey}
        filterType={activeFilter === "all" ? null : activeFilter}
        showActions={canPost}
      />
    </div>
  );
}

export default Announcements;
