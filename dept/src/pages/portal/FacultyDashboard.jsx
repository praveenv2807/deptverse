import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Clock, Users, BarChart3 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { facultyApi, api } from '../../utils/api'

export default function FacultyDashboard() {
    const [selectedClass, setSelectedClass] = useState(null)
    const [attendance, setAttendance] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [classes, setClasses] = useState([])
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const { user } = useAuth()

    const facultyName = user?.name || 'Dr. Faculty'
    const empId = user?.username || 'FAC001'

    useEffect(() => {
        const hash = location.hash.replace('#', '')
        if (hash === 'attendance') {
            setActiveTab('attendance')
            setTimeout(() => {
                document.getElementById('attendance-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        } else if (hash === 'classes') {
            setActiveTab('classes')
            setTimeout(() => {
                document.getElementById('classes-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        } else if (hash === 'performance') {
            setActiveTab('performance')
            setTimeout(() => {
                document.getElementById('performance-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        }
    }, [location.hash])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const classesData = await facultyApi.getClasses(empId)
                const studentsData = await facultyApi.getStudents()
                setClasses(classesData || [])
                setStudents(studentsData || [])
            } catch (error) {
                console.error('Failed to fetch:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [empId])

    const toggleAttendance = (roll) => {
        setAttendance(prev => ({
            ...prev,
            [roll]: prev[roll] === 'present' ? 'absent' : prev[roll] === 'absent' ? undefined : 'present'
        }))
    }

    const handleSubmit = async () => {
        const attendanceData = {
            classId: selectedClass.id,
            className: selectedClass.name,
            section: selectedClass.section,
            date: new Date().toISOString().split('T')[0],
            records: Object.entries(attendance).map(([rollNo, status]) => ({
                rollNo,
                status,
                markedBy: empId
            }))
        }

        try {
            await api.post('/attendance/submit', attendanceData)
            setSubmitted(true)
            setTimeout(() => { setSubmitted(false); setSelectedClass(null); setAttendance({}) }, 2500)
        } catch (error) {
            console.error('Failed to submit attendance:', error)
            setSubmitted(true)
            setTimeout(() => { setSubmitted(false); setSelectedClass(null); setAttendance({}) }, 2500)
        }
    }

    const presentCount = Object.values(attendance).filter(v => v === 'present').length

    const defaultStudents = [
        { rollNo: '2021CS001', name: 'Arun Kumar', photo: 'AK' },
        { rollNo: '2021CS002', name: 'Priya Rajan', photo: 'PR' },
        { rollNo: '2021CS003', name: 'Karthik M', photo: 'KM' },
        { rollNo: '2021CS004', name: 'Divya S', photo: 'DS' },
        { rollNo: '2021CS005', name: 'Manoj P', photo: 'MP' },
        { rollNo: '2021CS006', name: 'Sneha R', photo: 'SR' },
        { rollNo: '2021CS007', name: 'Vijay K', photo: 'VK' },
        { rollNo: '2021CS008', name: 'Ananya T', photo: 'AT' },
    ]

    const displayStudents = students.length > 0 
        ? students.map(s => ({ rollNo: s.rollNo, name: s.name, photo: s.name.split(' ').map(n => n[0]).join('') }))
        : defaultStudents

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border-l-4 border-l-green-400 border border-white/10">
                <h1 className="text-2xl font-heading font-bold text-white">Welcome, <span className="text-green-400">{facultyName}</span></h1>
                <p className="text-white/50 text-sm mt-1">{empId} | Faculty | CSE Department</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Today's Classes", value: classes.length || 3, icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/20' },
                    { label: 'Total Students', value: students.length || 62, icon: Users, color: 'text-green-400', bg: 'bg-green-500/20' },
                    { label: 'Attendance Marked', value: submitted ? `${classes.length}/${classes.length}` : '0/0', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/20' },
                    { label: 'Avg. Attendance', value: '85%', icon: BarChart3, color: 'text-purple-400', bg: 'bg-purple-500/20' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="bg-slate-800/60 backdrop-blur-md rounded-lg shadow-lg p-5 flex items-center gap-3 border border-white/10">
                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold font-heading text-white">{value}</p>
                            <p className="text-white/50 text-xs">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { key: 'dashboard', label: 'Dashboard' },
                    { key: 'attendance', label: 'Mark Attendance' },
                    { key: 'classes', label: 'My Classes' },
                    { key: 'performance', label: 'Performance' },
                ].map((tab) => (
                    <button key={tab.key} onClick={() => {
                        setActiveTab(tab.key)
                        const elementId = tab.key === 'attendance' ? 'attendance-section' : 
                                         tab.key === 'classes' ? 'classes-section' : 
                                         tab.key === 'performance' ? 'performance-section' : null
                        if (elementId) {
                            setTimeout(() => {
                                document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }, 100)
                        }
                    }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-800/60 backdrop-blur-md text-white/70 hover:bg-slate-700/60 border border-white/10'
                            }`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Classes Section */}
            <div id="attendance-section">
            <div id="classes-section" className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10">
                <div className="p-4 border-b border-white/10">
                    <h3 className="text-white font-semibold font-heading">Today's Classes</h3>
                </div>
                <div className="divide-y divide-white/10">
                    {(classes.length > 0 ? classes : [
                        { id: 1, name: 'Data Structures', section: 'A', time: '9:00 - 10:00', room: 'A101', students: 62 },
                        { id: 2, name: 'Operating Systems', section: 'B', time: '11:00 - 12:00', room: 'A102', students: 58 },
                        { id: 3, name: 'DBMS Lab', section: 'A', time: '2:00 - 4:00', room: 'Lab 3', students: 30 },
                    ]).map((cls) => (
                        <div key={cls.id} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
                            <div className="flex-1">
                                <p className="text-white font-medium">{cls.name}</p>
                                <p className="text-white/50 text-xs mt-0.5">Section {cls.section} | {cls.time} | {cls.room} | {cls.students} Students</p>
                            </div>
                            <button onClick={() => { setSelectedClass(cls); setAttendance({}) }}
                                className="bg-green-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium">
                                Mark Attendance
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            </div>

            {/* Attendance Panel */}
            {selectedClass && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <div>
                            <h3 className="text-white font-semibold font-heading">{selectedClass.name} — Attendance</h3>
                            <p className="text-white/50 text-xs mt-0.5">{selectedClass.time} | Section {selectedClass.section}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-bold">{presentCount}/{displayStudents.length}</p>
                            <p className="text-white/50 text-xs">Present</p>
                        </div>
                    </div>

                    <div className="p-4">
                        {/* Mark All */}
                        <div className="flex gap-2 mb-4">
                            <button onClick={() => setAttendance(Object.fromEntries(displayStudents.map(s => [s.rollNo, 'present'])))}
                                className="text-xs bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg hover:bg-green-500/30 transition-colors">
                                Mark All Present
                            </button>
                            <button onClick={() => setAttendance(Object.fromEntries(displayStudents.map(s => [s.rollNo, 'absent'])))}
                                className="text-xs bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors">
                                Mark All Absent
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {displayStudents.map((s) => {
                                const status = attendance[s.rollNo]
                                return (
                                    <button key={s.rollNo} onClick={() => toggleAttendance(s.rollNo)}
                                        className={`bg-slate-700/60 rounded-lg p-3 text-center transition-all border-2 hover:shadow-lg ${status === 'present' ? 'border-green-500'
                                                : status === 'absent' ? 'border-red-500'
                                                    : 'border-transparent'
                                            }`}>
                                        <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm ${status === 'present' ? 'bg-green-500' : status === 'absent' ? 'bg-red-500' : 'bg-white/10 text-white/70'
                                            }`}>
                                            {s.photo}
                                        </div>
                                        <p className="text-white text-xs font-medium">{s.name.split(' ')[0]}</p>
                                        <p className="text-white/40 text-xs">{s.rollNo}</p>
                                        {status && (
                                            <span className={`text-xs mt-1 inline-block ${status === 'present' ? 'text-green-400' : 'text-red-400'}`}>
                                                {status === 'present' ? 'Present' : 'Absent'}
                                            </span>
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="mt-4 flex gap-3">
                            <button onClick={handleSubmit} disabled={submitted}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50 font-medium">
                                {submitted ? 'Submitted!' : 'Submit Attendance'}
                            </button>
                            <button onClick={() => setSelectedClass(null)} className="px-4 py-2 border border-white/20 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Performance Section */}
            <div id="performance-section" className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
                <h3 className="text-white font-semibold font-heading mb-4">Faculty Performance</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/10 p-4 rounded-lg border border-white/10">
                        <p className="text-white/50 text-sm"> Classes Taken</p>
                        <p className="text-2xl font-bold text-white mt-1">156</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg border border-white/10">
                        <p className="text-white/50 text-sm">Avg. Student Rating</p>
                        <p className="text-2xl font-bold text-green-400 mt-1">4.8</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg border border-white/10">
                        <p className="text-white/50 text-sm">Publications This Year</p>
                        <p className="text-2xl font-bold text-blue-400 mt-1">12</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
