import React, { createContext, useState, useCallback } from "react";
import { leaveApi, odApi } from "../utils/api";

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [odRequests, setOdRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [facultyNotifications, setFacultyNotifications] = useState(0);
  const [studentNotifications, setStudentNotifications] = useState(0);
  const [adminNotifications, setAdminNotifications] = useState(0);

  const [popupNotification, setPopupNotification] = useState(null);

  const showPopup = (message, type = 'info') => {
    setPopupNotification({ message, type, id: Date.now() });
    setTimeout(() => setPopupNotification(null), 5000);
  };

  const fetchLeaveRequests = useCallback(async (rollNo = null) => {
    try {
      setLoading(true);
      const data = rollNo 
        ? await leaveApi.getMy(rollNo)
        : await leaveApi.getAll();
      setLeaveRequests(data || []);
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOdRequests = useCallback(async (rollNo = null) => {
    try {
      setLoading(true);
      const data = rollNo
        ? await odApi.getMy(rollNo)
        : await odApi.getAll();
      setOdRequests(data || []);
    } catch (error) {
      console.error('Failed to fetch OD requests:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPendingRequests = useCallback(async (userType) => {
    try {
      setLoading(true);
      const forType = userType === 'faculty' ? 'faculty' : 'admin';
      const [leaves, ods] = await Promise.all([
        leaveApi.getPending(forType),
        odApi.getPending()
      ]);
      return { leaves: leaves || [], ods: ods || [] };
    } catch (error) {
      console.error('Failed to fetch pending requests:', error);
      return { leaves: [], ods: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  const addLeaveRequest = async (request) => {
    try {
      const newRequest = await leaveApi.create(request);
      if (newRequest) {
        setLeaveRequests(prev => [newRequest, ...prev]);
        showPopup("Leave request submitted successfully!", "success");
      }
      return newRequest;
    } catch (error) {
      console.error('Failed to submit leave request:', error);
      showPopup("Failed to submit leave request", "error");
      throw error;
    }
  };

  const addOdRequest = async (request) => {
    try {
      const newRequest = await odApi.create(request);
      if (newRequest) {
        setOdRequests(prev => [newRequest, ...prev]);
        showPopup("OD request submitted successfully!", "success");
      }
      return newRequest;
    } catch (error) {
      console.error('Failed to submit OD request:', error);
      showPopup("Failed to submit OD request", "error");
      throw error;
    }
  };

  const updateLeaveStatus = async (id, data) => {
    try {
      const updated = await leaveApi.update(id, data);
      if (updated) {
        setLeaveRequests(prev => prev.map(r => r.id === id ? updated : r));
        const newStatus = data.status === 'approved' ? 'approved' : data.status === 'rejected' ? 'rejected' : 'faculty_approved';
        showPopup(`Leave request ${newStatus}!`, newStatus.includes('approved') ? "success" : "error");
        return updated;
      }
    } catch (error) {
      console.error('Failed to update leave request:', error);
      showPopup("Failed to update leave request", "error");
      throw error;
    }
  };

  const updateOdStatus = async (id, data) => {
    try {
      const updated = await odApi.update(id, data);
      if (updated) {
        setOdRequests(prev => prev.map(r => r.id === id ? updated : r));
        showPopup(`OD request ${data.status}!`, data.status === 'approved' ? "success" : "error");
        return updated;
      }
    } catch (error) {
      console.error('Failed to update OD request:', error);
      showPopup("Failed to update OD request", "error");
      throw error;
    }
  };

  const clearFacultyNotifications = () => {
    setFacultyNotifications(0);
  };

  const clearStudentNotifications = () => {
    setStudentNotifications(0);
  };

  const clearAdminNotifications = () => {
    setAdminNotifications(0);
  };

  const dismissPopup = () => {
    setPopupNotification(null);
  };

  return (
    <RequestContext.Provider value={{
      leaveRequests,
      odRequests,
      loading,
      fetchLeaveRequests,
      fetchOdRequests,
      fetchPendingRequests,
      addLeaveRequest,
      addOdRequest,
      updateLeaveStatus,
      updateOdStatus,
      facultyNotifications,
      studentNotifications,
      adminNotifications,
      clearFacultyNotifications,
      clearStudentNotifications,
      clearAdminNotifications,
      popupNotification,
      showPopup,
      dismissPopup
    }}>
      {children}
    </RequestContext.Provider>
  );
};