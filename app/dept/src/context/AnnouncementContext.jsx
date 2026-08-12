import React, { createContext, useState, useEffect, useCallback } from "react";
import { announcementApi } from "../utils/api";

export const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      const data = await announcementApi.getAll();
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const addAnnouncement = async (announcement) => {
    try {
      const newAnnouncement = await announcementApi.create(announcement);
      if (newAnnouncement) {
        setAnnouncements(prev => [newAnnouncement, ...prev]);
      }
      return newAnnouncement;
    } catch (error) {
      console.error('Failed to create announcement:', error);
      throw error;
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await announcementApi.delete(id);
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error('Failed to delete announcement:', error);
      throw error;
    }
  };

  const getAnnouncementsByType = (type) => {
    return announcements.filter(a => a.type === type);
  };

  return (
    <AnnouncementContext.Provider value={{
      announcements,
      loading,
      addAnnouncement,
      deleteAnnouncement,
      getAnnouncementsByType,
      refreshAnnouncements: fetchAnnouncements
    }}>
      {children}
    </AnnouncementContext.Provider>
  );
};
