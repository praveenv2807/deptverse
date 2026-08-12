import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    BookOpen, Users, FlaskConical, Briefcase, Trophy, Calendar,
    ArrowRight, ChevronRight, ChevronLeft, Star, Zap, Building
} from 'lucide-react'
import { stats, announcements, recruiters } from '../data/data'

function Counter({ value, suffix }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true
                let start = 0
                const end = value
                const duration = 2000
                const step = end / (duration / 16)
                const timer = setInterval(() => {
                    start += step
                    if (start >= end) { setCount(end); clearInterval(timer) }
                    else setCount(Math.floor(start))
                }, 16)
            }
        }, { threshold: 0.5 })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [value])

    return <span ref={ref}>{count}{suffix}</span>
}

const quickLinks = [
    { label: 'Programs', icon: BookOpen, path: '/programs', color: 'bg-blue-500/80 text-white', desc: 'UG, PG & PhD' },
    { label: 'Faculty', icon: Users, path: '/faculty', color: 'bg-purple-500/80 text-white', desc: '40+ Experts' },
    { label: 'Labs', icon: FlaskConical, path: '/curriculum-labs', color: 'bg-green-500/80 text-white', desc: '10+ Labs' },
    { label: 'Placements', icon: Briefcase, path: '/placements', color: 'bg-amber-500/80 text-white', desc: '95% Record' },
    { label: 'Research', icon: Star, path: '/research', color: 'bg-pink-500/80 text-white', desc: '100+ Papers' },
    { label: 'Events', icon: Calendar, path: '/events', color: 'bg-indigo-500/80 text-white', desc: 'Workshops & More' },
    { label: 'Achievements', icon: Trophy, path: '/research', color: 'bg-yellow-500/80 text-white', desc: 'Awards & Patents' },
    { label: 'Student Corner', icon: Zap, path: '/student-corner', color: 'bg-cyan-500/80 text-white', desc: 'Clubs & Alumni' },
]

const typeColors = {
    'Workshop': 'text-blue-300',
    'Internship': 'text-green-300',
    'Exam': 'text-red-300',
    'Hackathon': 'text-purple-300',
}

const badgeColors = {
    'Upcoming': 'bg-blue-500/50 text-blue-200',
    'Apply Now': 'bg-green-500/50 text-green-200',
    'Important': 'bg-red-500/50 text-red-200',
    'Register': 'bg-purple-500/50 text-purple-200',
}

export default function Home() {
    const [announcementIdx, setAnnouncementIdx] = useState(0)

    const prevAnn = () => setAnnouncementIdx((i) => (i - 1 + announcements.length) % announcements.length)
    const nextAnn = () => setAnnouncementIdx((i) => (i + 1) % announcements.length)

    const visible = [0, 1, 2].map(offset =>
        announcements[(announcementIdx + offset) % announcements.length]
    )

    return (
        <div className="min-h-screen" style={{
            backgroundImage: 'url(/bg-login.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }}>
            {/* HERO */}
            <section className="bg-gradient-to-br from-black/60 via-black/50 to-black/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
                                <Building className="w-4 h-4" />
                                Department of Computer Science & Engineering
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                                Welcome to <br />
                                <span className="text-blue-300">DeptVerse</span>
                            </h1>
                            <p className="text-white/80 text-lg leading-relaxed mb-8">
                                Shaping future technologists through innovation, research, and academic excellence. Join us in building tomorrow's technology leaders.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/programs" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                                    Explore Programs <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link to="/login"
                                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                                    Portal Login <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Placement Rate', value: '95%', sub: 'Batch 2024', color: 'bg-blue-500/80' },
                                { label: 'Total Students', value: '1000+', sub: 'UG + PG + PhD', color: 'bg-purple-500/80' },
                                { label: 'Research Papers', value: '100+', sub: 'Published', color: 'bg-green-500/80' },
                                { label: 'Industry MoUs', value: '20+', sub: 'Partnerships', color: 'bg-amber-500/80' },
                            ].map(({ label, value, sub, color }) => (
                                <div key={label} className={`${color} backdrop-blur-sm rounded-xl p-6 border border-white/20`}>
                                    <p className="text-3xl font-bold font-heading text-white mb-1">{value}</p>
                                    <p className="text-white font-semibold">{label}</p>
                                    <p className="text-white/70 text-sm">{sub}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* QUICK ACCESS */}
            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Quick Access</h2>
                    <p className="text-white/70 text-center mb-12 text-lg">Everything you need, one click away</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {quickLinks.map(({ label, icon: Icon, path, color, desc }, i) => (
                            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                                <Link to={path}
                                    className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all hover:-translate-y-1 block border border-white/10">
                                    <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <p className="text-white font-semibold font-heading">{label}</p>
                                    <p className="text-white/60 text-xs mt-1">{desc}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ABOUT PREVIEW */}
            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="inline-block bg-blue-500/30 text-blue-200 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-400/30">
                                About the Department
                            </div>
                            <h2 className="text-3xl font-heading font-bold text-white mb-6">
                                Shaping Tomorrow's Innovators
                            </h2>
                            <p className="text-white/70 leading-relaxed mb-6">
                                Established in 2004, the Department of Computer Science & Engineering has been at the forefront of technical education, producing engineers who lead global technology companies. With world-class labs, experienced faculty, and an industry-connected curriculum, we prepare students for the challenges of tomorrow.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {[
                                    { label: 'Vision', text: 'To be a world-class center of excellence in CSE education.' },
                                    { label: 'Mission', text: 'Imparting quality education, fostering research and innovation.' },
                                ].map(({ label, text }) => (
                                    <div key={label} className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 border-l-4 border-l-blue-400 border border-white/10">
                                        <p className="text-blue-300 font-semibold mb-2">{label}</p>
                                        <p className="text-white/70 text-sm">{text}</p>
                                    </div>
                                ))}
                            </div>
                            <Link to="/about" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-flex items-center gap-2">
                                Read More <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-8 border-t-4 border-t-blue-400 border border-white/10">
                            <p className="text-white/80 leading-relaxed italic mb-6 text-lg">
                                "Our department is committed to nurturing technically strong, ethically grounded, and research-oriented professionals who can make a meaningful impact on society."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold font-heading text-lg">
                                    RK
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Dr. V. Sharmila</p>
                                    <p className="text-white/60 text-sm">Professor & Head, CSE Department</p>
                                    <p className="text-blue-300 text-sm font-medium">Ph.D, IIT Madras</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="bg-blue-600/90 backdrop-blur-md">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Department Highlights</h2>
                    <p className="text-blue-100 text-center mb-12 text-lg">Numbers that speak for themselves</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {stats.map(({ label, value, suffix }) => (
                            <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                                <p className="text-4xl font-bold font-heading text-white mb-2">
                                    <Counter value={value} suffix={suffix} />
                                </p>
                                <p className="text-blue-100 font-medium">{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ANNOUNCEMENTS */}
            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-white">Latest Announcements</h2>
                            <p className="text-white/60 mt-1">Stay up-to-date with department news</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={prevAnn} className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            <button onClick={nextAnn} className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visible.map((ann) => (
                            <motion.div key={ann.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-sm font-semibold ${typeColors[ann.type] || 'text-blue-300'}`}>
                                        {ann.type}
                                    </span>
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${badgeColors[ann.badge] || 'bg-slate-700/50 text-slate-200'}`}>
                                        {ann.badge}
                                    </span>
                                </div>
                                <h3 className="text-white font-semibold font-heading mb-2">{ann.title}</h3>
                                <p className="text-white/60 text-sm mb-4 leading-relaxed">{ann.description}</p>
                                <p className="text-white/40 text-xs">{ann.date}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RECRUITERS */}
            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Our Recruiters</h2>
                    <p className="text-white/60 text-center mb-12 text-lg">Top companies hiring our graduates</p>
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

            {/* CTA */}
            <section>
                <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-12 border-t-4 border-t-blue-400 border border-white/10">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                            Join the Future of Computing
                        </h2>
                        <p className="text-white/70 text-lg mb-8 leading-relaxed">
                            Be part of a department that's shaping the next generation of technologists. Explore programs, connect with faculty, and launch your career.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/programs" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
                                Explore Programs <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link to="/login"
                                className="border-2 border-blue-400 text-blue-300 px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 hover:text-slate-900 transition-colors">
                                Access ERP Portal
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
