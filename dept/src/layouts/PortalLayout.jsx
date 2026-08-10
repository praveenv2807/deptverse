import React, { useState, useContext } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import AIChatbot from "../components/AIChatbot";
import { RequestContext } from "../context/RequestContext";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Calendar, 
  BookOpen, 
  CreditCard,
  FileText,
  FileCheck,
  CheckSquare,
  ClipboardCheck,
  BarChart3,
  Users,
  Settings ,
  LogOut,
  Menu,
  Bell,
  X,
  BellRing
} from 'lucide-react';

const studentLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/portal/student' },
  { label: 'Announcements', icon: BellRing, path: '/portal/announcements' },
  { label: 'Attendance', icon: ClipboardList, path: '/portal/student#attendance' },
  { label: 'Timetable', icon: Calendar, path: '/portal/student#timetable' },
  { label: 'Results', icon: BookOpen, path: '/portal/student#results' },
  { label: 'Fee Status', icon: CreditCard, path: '/portal/student#fee' },
  { label: 'Leave Request', icon: FileText, path: '/portal/leave' },
  { label: 'OD Request', icon: FileCheck, path: '/portal/od' },
  { label: 'My Requests', icon: ClipboardList, path: '/portal/student/my-requests' },
];

const facultyLinks = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/portal/faculty' },
    { label: 'Announcements', icon: BellRing, path: '/portal/announcements' },
    { label: 'Mark Attendance', icon: ClipboardList, path: '/portal/faculty#attendance' },
    { label: 'My Classes', icon: Calendar, path: '/portal/faculty#classes' },
    { label: 'Performance', icon: BarChart3, path: '/portal/faculty#performance' },
    { label: 'Student Leave Approval', icon: CheckSquare, path: '/portal/faculty-leave-approval' },
    { label: 'Student OD Approval', icon: ClipboardCheck, path: '/portal/faculty-od-approval' },
    { label: 'Apply Leave', icon: FileText, path: '/portal/faculty-leave-request' },
    { label: 'My Requests', icon: ClipboardList, path: '/portal/faculty/my-requests' },
];


const adminLinks = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/portal/admin' },
    { label: 'Announcements', icon: BellRing, path: '/portal/announcements' },
    { label: 'Students', icon: Users, path: '/portal/admin#students' },
    { label: 'Faculty', icon: Users, path: '/portal/admin#faculty' },
    { label: 'Reports', icon: BarChart3, path: '/portal/admin#reports' },
    { label: 'Faculty Leave Approval', icon: CheckSquare, path: '/portal/admin-leave-approval' },
    { label: 'My Requests', icon: ClipboardList, path: '/portal/admin/my-requests' },
]

const roleColors = {
    Faculty: 'bg-green-500',
    Admin: 'bg-purple-500',
    Student: 'bg-blue-500'
}

export default function PortalLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { 
        facultyNotifications, 
        studentNotifications, 
        adminNotifications, 
        clearFacultyNotifications, 
        clearStudentNotifications,
        clearAdminNotifications,
        popupNotification,
        dismissPopup
    } = useContext(RequestContext)

    const role = user?.role || (location.pathname.includes('faculty') ? 'Faculty'
        : location.pathname.includes('admin') ? 'Admin' : 'Student')

    const links = role === 'Faculty' ? facultyLinks
        : role === 'Admin' ? adminLinks : studentLinks

    const roleColor = roleColors[role]

    const getNotificationCount = () => {
        if (role === 'Faculty') return facultyNotifications;
        if (role === 'Admin') return adminNotifications;
        return studentNotifications;
    }

    const handleBellClick = () => {
        if (role === 'Faculty') clearFacultyNotifications();
        else if (role === 'Admin') clearAdminNotifications();
        else clearStudentNotifications();
    }

    const notificationCount = getNotificationCount();

    return (
        <div className="min-h-screen flex" style={{
            backgroundImage: 'url(/bg-login.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur-md border-r border-white/10 transform transition-transform duration-300 shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>

                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <Link to="/" className="flex items-center gap-2">
                        <Logo size="sm" />
                        <div>
                            <span className="text-white font-heading font-bold">{role} Portal</span>
                        </div>
                    </Link>
                </div>

                {/* Role Badge */}
                <div className="px-4 py-4">
                    <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${roleColor} flex items-center justify-center text-white font-bold text-sm`}>
                            {role === 'Student' ? 'ST' : role === 'Faculty' ? 'FC' : 'AD'}
                        </div>
                        <div>
                            <p className="text-white text-sm font-semibold">
                                {role === 'Student' ? 'Arun Kumar' : role === 'Faculty' ? 'Dr. Meenakshi' : 'Administrator'}
                            </p>
                            <p className="text-white/50 text-xs">{role}</p>
                        </div>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="px-4 py-2 space-y-1">
                    {links.map(({ label, icon: Icon, path }) => {
                        const isActive = location.pathname === path || location.pathname + '#' + location.hash.replace('#', '') === path
                        const activeClass = isActive ? 'bg-blue-500/20 text-blue-400' : 'text-white/70 hover:bg-white/5 hover:text-white'
                        return (
                            <Link key={label} to={path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeClass}`}>
                                <Icon className="w-5 h-5" />
                                <span>{label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium w-full text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-30">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 text-white/70 hover:bg-white/10 rounded-lg">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="hidden lg:block">
                        <h2 className="text-white font-semibold font-heading">{role} Dashboard</h2>
                        <p className="text-white/50 text-xs">Welcome back!</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleBellClick}
                            className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
                        >
                            <Bell className="w-5 h-5" />
                            {notificationCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                    {notificationCount}
                                </span>
                            )}
                        </button>
                        <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">
                            ← Back to Website
                        </Link>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* Popup Notification */}
            {popupNotification && (
                <div className={`fixed top-4 right-4 z-50 animate-slide-in-right`}>
                    <div className={`bg-slate-800/95 backdrop-blur-md rounded-xl shadow-xl p-4 pr-10 border-l-4 ${
                        popupNotification.type === 'success' ? 'border-green-500' :
                        popupNotification.type === 'error' ? 'border-red-500' :
                        'border-blue-500'
                    }`}>
                        <p className="text-white text-sm font-medium">{popupNotification.message}</p>
                        <button 
                            onClick={dismissPopup}
                            className="absolute top-2 right-2 text-white/50 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <AIChatbot />
        </div>
    )
}
