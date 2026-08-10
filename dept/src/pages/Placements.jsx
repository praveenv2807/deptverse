import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Award, Briefcase, Building2, MapPin, Calendar, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { placementApi } from '../utils/api'

const recruiters = ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Deloitte', 'Cognizant', 'HCL', 'IBM', 'Intel']

export default function Placements() {
    const [stats, setStats] = useState({ totalPlaced: 0, totalApplications: 0, upcomingDrives: 0, avgPackage: 0 })
    const [drives, setDrives] = useState([])
    const [myApplications, setMyApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [applying, setApplying] = useState(null)

    const currentStudent = '2021CS001'

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [statsData, drivesData, applications] = await Promise.all([
                placementApi.getStats(),
                placementApi.getDrives(),
                placementApi.getMyApplications(currentStudent)
            ])
            setStats(statsData || {})
            setDrives(drivesData || [])
            setMyApplications(applications || [])
        } catch (error) {
            console.error('Failed to fetch:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleApply = async (driveId) => {
        try {
            setApplying(driveId)
            await placementApi.apply(currentStudent, driveId)
            await fetchData()
        } catch (error) {
            alert(error.message || 'Failed to apply')
        } finally {
            setApplying(null)
        }
    }

    const isApplied = (driveId) => myApplications.some(a => a.driveId === driveId)

    const getStatusBadge = (status) => {
        switch (status) {
            case 'selected':
                return <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-500/20 text-green-300"><CheckCircle className="w-3 h-3" /> Selected</span>
            case 'rejected':
                return <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-red-500/20 text-red-300"><XCircle className="w-3 h-3" /> Rejected</span>
            case 'applied':
                return <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-blue-500/20 text-blue-300"><Clock className="w-3 h-3" /> Applied</span>
            default:
                return null
        }
    }

    const upcomingDrives = drives.filter(d => d.status === 'upcoming')
    const completedDrives = drives.filter(d => d.status === 'completed')

    const placementStats = [
        { year: 2020, percentage: 85, avgPackage: 6.5 },
        { year: 2021, percentage: 88, avgPackage: 7.2 },
        { year: 2022, percentage: 90, avgPackage: 8.5 },
        { year: 2023, percentage: 92, avgPackage: 9.8 },
        { year: 2024, percentage: 95, avgPackage: 12.5 },
    ]

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{
                backgroundImage: 'url(/bg-login.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen" style={{
            backgroundImage: 'url(/bg-login.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            <section className="bg-gradient-to-br from-black/60 via-black/50 to-black/60 py-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl font-heading font-bold text-white mb-6">Placements & <span className="text-blue-300">Industry</span></h1>
                        <p className="text-white/80 text-xl">Connecting talent with opportunity — {stats.totalPlaced}+ students placed.</p>
                    </motion.div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {[
                            { label: 'Placement Rate', value: `${stats.placementRate || 95}%`, color: 'text-green-400' },
                            { label: 'Avg Package', value: `₹${stats.avgPackage || 12.5}L`, color: 'text-blue-400' },
                            { label: 'Total Placed', value: stats.totalPlaced || 190, color: 'text-purple-400' },
                            { label: 'Companies', value: recruiters.length + '+', color: 'text-orange-400' },
                        ].map(({ label, value, color }) => (
                            <div key={label} className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 text-center border border-white/10">
                                <p className={`text-3xl font-bold font-heading ${color} mb-2`}>{value}</p>
                                <p className="text-white/60 text-sm">{label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
                            <h3 className="text-white font-heading font-semibold mb-4">Placement % Trend</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={placementStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
                                    <Bar dataKey="percentage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
                            <h3 className="text-white font-heading font-semibold mb-4">Avg Package (LPA) Trend</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={placementStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
                                    <Bar dataKey="avgPackage" fill="#a855f7" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {myApplications.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-heading font-bold text-white mb-4">My Applications</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {myApplications.map((app) => (
                                    <div key={app.id} className="bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                                <Building2 className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{app.company?.name || 'Company'}</p>
                                                <p className="text-white/50 text-xs">{app.drive?.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-green-400 font-semibold">₹{app.drive?.package}L PA</span>
                                            {getStatusBadge(app.status)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {upcomingDrives.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-heading font-bold text-white mb-4">Upcoming Drives</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {upcomingDrives.map((drive) => (
                                    <motion.div key={drive.id} whileHover={{ scale: 1.02 }}
                                        className="bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-blue-500/50 transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg font-bold text-blue-400">
                                                {drive.company?.logo || 'C'}
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">{drive.company?.name}</p>
                                                <p className="text-white/50 text-sm">{drive.role}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                                            <div className="flex items-center gap-1 text-white/60">
                                                <DollarSign className="w-3 h-3" />
                                                ₹{drive.package}L
                                            </div>
                                            <div className="flex items-center gap-1 text-white/60">
                                                <MapPin className="w-3 h-3" />
                                                {drive.location}
                                            </div>
                                            <div className="flex items-center gap-1 text-white/60">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(drive.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                            <span className="text-xs text-white/50">{drive.applications} applicants</span>
                                            {isApplied(drive.id) ? (
                                                getStatusBadge('applied')
                                            ) : (
                                                <button
                                                    onClick={() => handleApply(drive.id)}
                                                    disabled={applying === drive.id}
                                                    className="px-3 py-1.5 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 font-medium"
                                                >
                                                    {applying === drive.id ? 'Applying...' : 'Apply Now'}
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-8">Our Recruiters</h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {recruiters.map((name) => (
                            <motion.div key={name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 flex items-center justify-center hover:shadow-xl transition-shadow border border-white/10">
                                <span className="text-white font-bold font-heading text-sm text-center">{name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
