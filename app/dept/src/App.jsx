import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PortalLayout from "./layouts/PortalLayout";

// Module Imports
import LeaveRequest from "./modules/LeaveRequest";
import ODRequest from "./modules/ODRequest";
import FacultyLeaveApproval from "./modules/FacultyLeaveApproval";
import FacultyODApproval from "./modules/FacultyODApproval";
import FacultyLeaveRequest from "./modules/FacultyLeaveRequest";
import AdminLeaveApproval from "./modules/AdminLeaveApproval";
import MyRequests from "./modules/MyRequests";
import Announcements from "./modules/Announcements";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Faculty from "./pages/Faculty";
import CurriculumLabs from "./pages/CurriculumLabs";
import Research from "./pages/Research";
import Placements from "./pages/Placements";
import Events from "./pages/Events";
import StudentCorner from "./pages/StudentCorner";
import ELearning from "./pages/eLearning";
import Practice from "./pages/Practice";
import Login from "./pages/Login";
import ELearningHub from "./pages/ELearningHub";

// Portal Pages
import StudentDashboard from "./pages/portal/StudentDashboard";
import FacultyDashboard from "./pages/portal/FacultyDashboard";
import AdminPanel from "./pages/portal/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/curriculum-labs" element={<CurriculumLabs />} />
          <Route path="/research" element={<Research />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/events" element={<Events />} />
          <Route path="/student-corner" element={<StudentCorner />} />
          <Route path="/elearning" element={<ELearning />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/elearning-hub" element={<ELearningHub />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Portal Routes */}
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<Navigate to="/portal/student" replace />} />

          {/* Dashboards */}
          <Route path="student" element={<StudentDashboard />} />
          <Route path="faculty" element={<FacultyDashboard />} />
          <Route path="admin" element={<AdminPanel />} />

          {/* Student Requests */}
          <Route path="leave" element={<LeaveRequest />} />
          <Route path="od" element={<ODRequest />} />

          {/* Faculty Approvals */}
          <Route
            path="faculty-leave-approval"
            element={<FacultyLeaveApproval />}
          />
          <Route path="faculty-od-approval" element={<FacultyODApproval />} />
          <Route
            path="faculty-leave-request"
            element={<FacultyLeaveRequest />}
          />

          {/* My Requests */}
          <Route
            path="student/my-requests"
            element={<MyRequests role="Student" />}
          />
          <Route
            path="faculty/my-requests"
            element={<MyRequests role="Faculty" />}
          />
          <Route
            path="admin/my-requests"
            element={<MyRequests role="Admin" />}
          />

          {/* Admin Approvals */}
          <Route path="admin-leave-approval" element={<AdminLeaveApproval />} />

          {/* Announcements */}
          <Route path="announcements" element={<Announcements />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
