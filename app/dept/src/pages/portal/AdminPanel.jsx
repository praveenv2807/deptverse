import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, GraduationCap, BarChart3, TrendingUp, Download, Search, FileText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts'
import { adminApi } from '../../utils/api'

const placementStats = [
    { year: 2020, percentage: 85, avgPackage: 6.5, studentsPlaced: 170 },
    { year: 2021, percentage: 88, avgPackage: 7.2, studentsPlaced: 176 },
    { year: 2022, percentage: 90, avgPackage: 8.5, studentsPlaced: 180 },
    { year: 2023, percentage: 92, avgPackage: 9.8, studentsPlaced: 184 },
    { year: 2024, percentage: 95, avgPackage: 12.5, studentsPlaced: 190 },
]

const faculty = [
    { id: 1, name: 'Dr. Meenakshi Sundaram', designation: 'Professor & HOD', specialization: 'Machine Learning', experience: '18 years', publications: 45 },
    { id: 2, name: 'Dr. Rajesh Kumar', designation: 'Associate Professor', specialization: 'Computer Networks', experience: '12 years', publications: 32 },
    { id: 3, name: 'Prof. Kavitha V', designation: 'Assistant Professor', specialization: 'Database Systems', experience: '6 years', publications: 18 },
]

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('overview')
    const [search, setSearch] = useState('')
    const [studentsData, setStudentsData] = useState([])
    const [stats, setStats] = useState({ totalStudents: 0, totalFaculty: 0, avgAttendance: 0, placementRate: 0 })
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const hash = location.hash.replace('#', '')
        if (hash && ['overview', 'students', 'faculty', 'reports'].includes(hash)) {
            setActiveTab(hash)
        }
    }, [location.hash])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [students, statsData] = await Promise.all([
                    adminApi.getStudents(),
                    adminApi.getStats()
                ])
                setStudentsData(students || [])
                setStats(statsData || { totalStudents: 0, totalFaculty: 0, avgAttendance: 0, placementRate: 0 })
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredStudents = studentsData.filter(s =>
        s.name?.toLowerCase().includes(search.toLowerCase()) || s.rollNo?.includes(search)
    )

    const tabs = ['overview', 'students', 'faculty', 'reports']

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border-l-4 border-l-purple-400 border border-white/10">
                <h1 className="text-2xl font-heading font-bold text-white">Admin Dashboard</h1>
                <p className="text-white/50 text-sm mt-1">Full departmental overview and management</p>
            </motion.div>

            {/* Top Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/20' },
                    { label: 'Faculty Members', value: stats.totalFaculty, icon: GraduationCap, color: 'text-purple-400', bg: 'bg-purple-500/20' },
                    { label: 'Avg Attendance', value: `${stats.avgAttendance}%`, icon: BarChart3, color: 'text-green-400', bg: 'bg-green-500/20' },
                    { label: 'Placement Rate', value: `${stats.placementRate}%`, icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-500/20' },
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

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
                {tabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                                ? 'bg-purple-500 text-white'
                                : 'bg-slate-800/60 backdrop-blur-md text-white/70 hover:bg-slate-700/60 border border-white/10'
                            }`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Overview */}
            {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
                            <h3 className="text-white font-semibold font-heading mb-4">Placement Trend</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={placementStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
                                    <Line type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
                            <h3 className="text-white font-semibold font-heading mb-4">Avg Package (LPA)</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={placementStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
                                    <Bar dataKey="avgPackage" fill="#a855f7" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Alerts */}
                    <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-5 border border-white/10">
                        <h3 className="text-white font-semibold font-heading mb-3">Attention Required</h3>
                        <div className="space-y-2">
                            {[
                                { msg: '18 students have attendance below 75%', level: 'red' },
                                { msg: '3 faculty leave requests pending approval', level: 'yellow' },
                                { msg: 'NBA accreditation renewal due in 60 days', level: 'orange' },
                            ].map(({ msg, level }) => (
                                <div key={msg} className={`flex items-center gap-3 p-3 rounded-lg border ${level === 'red' ? 'bg-red-500/10 border-red-500/30 text-red-300'
                                        : level === 'yellow' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                            : 'bg-orange-500/10 border-orange-500/30 text-orange-300'
                                    }`}>
                                    <span className="text-sm">{msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Students */}
            {activeTab === 'students' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4 flex-wrap">
                        <h3 className="text-white font-semibold font-heading">Student Management</h3>
                        <div className="flex gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                <input value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder="Search students..."
                                    className="border border-white/20 bg-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 w-48" />
                            </div>
                            <button className="px-3 py-2 border border-white/20 rounded-lg text-white/70 hover:bg-white/10 flex items-center gap-1 text-sm">
                                <Download className="w-4 h-4" /> Export
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    {['Roll No', 'Name', 'Year', 'Section', 'Email', 'Action'].map(h => (
                                        <th key={h} className="text-left px-4 py-3 text-white/50 font-medium">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredStudents.map((s) => (
                                    <tr key={s.rollNo} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-3 text-white/70 font-mono text-xs">{s.rollNo}</td>
                                        <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                                        <td className="px-4 py-3 text-white/70">{s.year}</td>
                                        <td className="px-4 py-3 text-white/70">{s.section}</td>
                                        <td className="px-4 py-3 text-white/70 text-xs">{s.email}</td>
                                        <td className="px-4 py-3">
                                            <button className="text-xs text-purple-400 hover:underline">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Faculty */}
            {activeTab === 'faculty' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10">
                    <div className="p-4 border-b border-white/10">
                        <h3 className="text-white font-semibold font-heading">Faculty Management</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    {['Name', 'Designation', 'Specialization', 'Experience', 'Publications'].map(h => (
                                        <th key={h} className="text-left px-4 py-3 text-white/50 font-medium">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {faculty.map((f) => (
                                    <tr key={f.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-3 text-white font-medium">{f.name}</td>
                                        <td className="px-4 py-3 text-purple-400 text-xs">{f.designation}</td>
                                        <td className="px-4 py-3 text-white/70 text-xs">{f.specialization}</td>
                                        <td className="px-4 py-3 text-white/70">{f.experience}</td>
                                        <td className="px-4 py-3 text-white font-semibold">{f.publications}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Reports */}
            {activeTab === 'reports' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-4">
                    {[
                        { name: 'Attendance Report (Month)', desc: 'Complete monthly attendance analysis', color: 'bg-blue-500' },
                        { name: 'Placement Report 2024', desc: 'Placement statistics and company-wise data', color: 'bg-purple-500' },
                        { name: 'Faculty Performance', desc: 'Publications, feedback, and evaluation', color: 'bg-green-500' },
                        { name: 'Academic Progress Report', desc: 'IA marks and CGPA analysis', color: 'bg-orange-500' },
                    ].map(({ name, desc, color }) => (
                        <div key={name} className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex items-center justify-between border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                                <div>
                                    <span className="text-white font-semibold font-heading">{name}</span>
                                    <p className="text-white/50 text-sm mt-1">{desc}</p>
                                </div>
                            </div>
                            <button className="flex-shrink-0 p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white/50 hover:text-white transition-colors ml-4">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}
