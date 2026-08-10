import React, { useContext } from "react";
import { AnnouncementContext } from "../context/AnnouncementContext";
import { Bell, Trash2, Calendar } from "lucide-react";

const typeConfig = {
  Holiday: { icon: "🎉", color: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
  Exam: { icon: "📝", color: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" },
  Event: { icon: "🎪", color: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
  Placement: { icon: "💼", color: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" }
};

function AnnouncementList({ showActions = false, filterType = null }) {
  const { announcements, deleteAnnouncement } = useContext(AnnouncementContext);

  let filteredAnnouncements = announcements;
  if (filterType) {
    filteredAnnouncements = announcements.filter(a => a.type === filterType);
  }

  if (filteredAnnouncements.length === 0) {
    return (
      <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-8 border border-white/10 text-center">
        <Bell className="w-12 h-12 text-white/20 mx-auto mb-3" />
        <p className="text-white/50">No announcements yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAnnouncements.map((announcement) => {
        const config = typeConfig[announcement.type] || typeConfig.Event;
        return (
          <div
            key={announcement.id}
            className={`bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-5 border ${config.border} ${
              announcement.priority === 'high' ? 'ring-2 ring-red-500/50' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                  {config.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium ${config.text}`}>
                      {announcement.type}
                    </span>
                    {announcement.priority === 'high' && (
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-lg">{announcement.title}</h3>
                  <p className="text-white/70 text-sm mt-1">{announcement.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {announcement.date}
                    </span>
                    <span>Posted by: {announcement.postedBy}</span>
                  </div>
                </div>
              </div>
              {showActions && (
                <button
                  onClick={() => deleteAnnouncement(announcement.id)}
                  className="text-white/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AnnouncementList;
