import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Calendar, BookOpen, CreditCard, Trophy, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { studentApi } from '../../utils/api'

function AttendanceCard({ subject, attended, total, percentage }) {
    const color = percentage >= 90 ? '#34d399' : percentage >= 75 ? '#60a5fa' : '#f87171'
    return (
        <div className="bg-slate-800/60 backdrop-blur-md rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition-shadow border border-white/10">
            <div className="relative w-20 h-20 mx-auto mb-3">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#334155" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3"
                        strokeDasharray={`${percentage} ${100 - percentage}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{percentage}%</span>
                </div>
            </div>
            <p className="text-white font-semibold font-heading text-sm">{subject}</p>
            <p className="text-white/50 text-xs mt-1">{attended}/{total} classes</p>
            {percentage < 75 && (
                <span className="inline-block mt-2 text-xs text-red-300 bg-red-500/20 px-2 py-0.5 rounded-full">
                    Low
                </span>
            )}
        </div>
    )
}

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState('attendance')
    const [attendanceData, setAttendanceData] = useState([])
    const [resultsData, setResultsData] = useState([])
    const [timetableData, setTimetableData] = useState([])
    const [feeData, setFeeData] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const { user } = useAuth()

    const studentRollNo = user?.username || '2021CS001'
    const studentName = user?.name || 'Student'
    const overall = attendanceData.length > 0 
        ? Math.round(attendanceData.reduce((a, b) => a + b.percentage, 0) / attendanceData.length)
        : 0

    useEffect(() => {
        const hash = location.hash.replace('#', '')
        if (hash && ['attendance', 'timetable', 'results', 'fee'].includes(hash)) {
            setActiveTab(hash)
        }
    }, [location.hash])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [attendance, results, timetable, fee] = await Promise.all([
                    studentApi.getAttendance(studentRollNo),
                    studentApi.getResults(studentRollNo),
                    studentApi.getTimetable('III', 'A'),
                    studentApi.getFee(studentRollNo)
                ])
                setAttendanceData(attendance || [])
                setResultsData(results || [])
                setTimetableData(timetable || [])
                setFeeData(fee || [])
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [studentRollNo])

    const tabs = ['attendance', 'timetable', 'results', 'fee']

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border-l-4 border-l-blue-400 border border-white/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-white">Welcome back, <span className="text-blue-400">{studentName}</span></h1>
                        <p className="text-white/50 text-sm mt-1">{studentRollNo} | III Year B.E. CSE | Section A</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <p className="text-3xl font-bold font-heading text-blue-400">{overall}%</p>
                            <p className="text-white/50 text-xs">Overall Attendance</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Attendance', value: `${overall}%`, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/20' },
                    { label: 'Pending Leaves', value: '2', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/20' },
                    { label: 'Assignments Due', value: '3', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/20' },
                    { label: 'Exam in Days', value: '12', icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/20' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-800/60 backdrop-blur-md rounded-lg shadow-lg p-5 flex items-center gap-3 border border-white/10">
                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold font-heading text-white">{value}</p>
                            <p className="text-white/50 text-xs">{label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
                {tabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                                ? 'bg-blue-500 text-white'
                                : 'bg-slate-800/60 backdrop-blur-md text-white/70 hover:bg-slate-700/60 border border-white/10'
                            }`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'attendance' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {attendanceData.map((item) => <AttendanceCard key={item.subject} {...item} />)}
                    </div>
                    <div className="mt-6 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
                        <h3 className="text-white font-semibold font-heading mb-4">Attendance Chart</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 100]} />
                                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
                                <Bar dataKey="percentage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}

            {activeTab === 'timetable' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10">
                    <div className="p-4 border-b border-white/10">
                        <h3 className="text-white font-semibold font-heading">Today's Schedule</h3>
                        <p className="text-white/50 text-xs mt-1">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="divide-y divide-white/10">
                        {timetableData.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
                                <div className="w-28 text-xs text-blue-400 font-mono flex-shrink-0">{item.time}</div>
                                <div className="flex-1">
                                    <p className="text-white font-medium">{item.subject}</p>
                                    <p className="text-white/50 text-xs">{item.faculty}</p>
                                </div>
                                <span className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded">{item.room}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'results' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10">
                    <div className="p-4 border-b border-white/10">
                        <h3 className="text-white font-semibold font-heading">Internal Assessment Marks</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left px-4 py-3 text-white/50 font-medium">Subject</th>
                                    <th className="text-center px-4 py-3 text-white/50 font-medium">IA-1 (50)</th>
                                    <th className="text-center px-4 py-3 text-white/50 font-medium">IA-2 (50)</th>
                                    <th className="text-center px-4 py-3 text-white/50 font-medium">Total (100)</th>
                                    <th className="text-center px-4 py-3 text-white/50 font-medium">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {resultsData.map((m) => (
                                    <tr key={m.id} className="hover:bg-white/5">
                                        <td className="px-4 py-3 text-white font-medium">{m.subject}</td>
                                        <td className="px-4 py-3 text-center text-white/70">{m.ia1}</td>
                                        <td className="px-4 py-3 text-center text-white/70">{m.ia2}</td>
                                        <td className="px-4 py-3 text-center font-bold text-white">{m.total}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${m.total >= 90 ? 'bg-green-500/20 text-green-300' : m.total >= 80 ? 'bg-blue-500/20 text-blue-300' : 'bg-amber-500/20 text-amber-300'}`}>
                                                {m.grade}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {activeTab === 'fee' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border-l-4 border-l-green-400 border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                            <h3 className="text-white font-semibold font-heading">Fee Status - Academic Year 2024-25</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {feeData.map((fee) => (
                                <div key={fee.id} className="bg-white/10 rounded-lg p-4 border border-white/10">
                                    <p className="text-white/50 text-xs mb-1">{fee.term}</p>
                                    <p className="text-white font-bold font-heading text-lg">₹{fee.amount.toLocaleString()}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${fee.status === 'paid' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                            {fee.status === 'paid' ? 'Paid' : 'Pending'}
                                        </span>
                                        <span className="text-white/40 text-xs">
                                            {fee.status === 'paid' ? fee.paidDate : `Due: ${fee.dueDate}`}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
