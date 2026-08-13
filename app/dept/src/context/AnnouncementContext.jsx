import React, { createContext, useState, useEffect, useCallback } from "react";

export const AnnouncementContext = createContext();

const MOCK_INITIAL = [
  {
    id: 1,
    title: "Pongal Holiday Notice",
    type: "Holiday",
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
    type: "Event",
    category: "Event",
    content: "Registrations are open for the annual cultural and tech fest.",
    date: "2026-01-12",
    postedBy: "Faculty",
    isUrgent: true,
  },
];

export const AnnouncementProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      const saved = localStorage.getItem("dept_announcements");
      if (saved) {
        setAnnouncements(JSON.parse(saved));
      } else {
        setAnnouncements(MOCK_INITIAL);
        localStorage.setItem(
          "dept_announcements",
          JSON.stringify(MOCK_INITIAL),
        );
      }
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      setAnnouncements(MOCK_INITIAL);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const addAnnouncement = async (announcement) => {
    try {
      const newAnnouncement = {
        ...announcement,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
      };

      setAnnouncements((prev) => {
        const updated = [newAnnouncement, ...prev];
        localStorage.setItem("dept_announcements", JSON.stringify(updated));
        return updated;
      });

      return newAnnouncement;
    } catch (error) {
      console.error("Failed to create announcement:", error);
      throw error;
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      setAnnouncements((prev) => {
        const updated = prev.filter((a) => a.id !== id);
        localStorage.setItem("dept_announcements", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Failed to delete announcement:", error);
      throw error;
    }
  };

  const getAnnouncementsByType = (type) => {
    if (!type || type === "all") return announcements;
    return announcements.filter((a) => a.type === type || a.category === type);
  };

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        loading,
        addAnnouncement,
        deleteAnnouncement,
        getAnnouncementsByType,
        refreshAnnouncements: fetchAnnouncements,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};
