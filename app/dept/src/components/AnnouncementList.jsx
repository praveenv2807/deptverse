import React, { useState, useEffect } from "react";
import { Calendar, Tag, AlertTriangle, Trash2 } from "lucide-react";

const initialData = [
  {
    id: 1,
    title: "Pongal Holiday Notice",
    category: "Holiday",
    content:
      "College will remain closed on 15th January for Pongal festivities.",
    date: "2026-01-10",
    postedBy: "Admin",
    isUrgent: false,
  },
  {
    id: 2,
    title: "Annual Campus Event 2026",
    category: "Event",
    content: "Registrations are open for the annual cultural and tech fest.",
    date: "2026-01-12",
    postedBy: "Faculty",
    isUrgent: true,
  },
];

export default function AnnouncementList({ filterType, showActions }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("dept_announcements");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        setItems(initialData);
      }
    } else {
      setItems(initialData);
      localStorage.setItem("dept_announcements", JSON.stringify(initialData));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("dept_announcements", JSON.stringify(updated));
  };

  const filteredItems = filterType
    ? items.filter((item) => item.category === filterType)
    : items;

  return (
    <div className="space-y-4">
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-lg hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 w-full">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>

                  {item.isUrgent && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Urgent
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white">{item.title}</h3>

                <p className="text-white/70 text-sm leading-relaxed">
                  {item.content}
                </p>

                <div className="flex items-center gap-4 text-xs text-white/40 pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span>
                    Posted by:{" "}
                    <strong className="text-white/70">{item.postedBy}</strong>
                  </span>
                </div>
              </div>

              {showActions && (
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-white/40 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-slate-900/50 rounded-2xl p-8 text-center text-white/40 border border-white/10">
          No announcements found for this category.
        </div>
      )}
    </div>
  );
}
