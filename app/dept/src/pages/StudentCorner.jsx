import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Users, Trophy, Star } from 'lucide-react'

const clubs = [
    { name: 'CodersHub', type: 'Coding Club', members: 120, desc: 'Competitive programming, hackathons, open source.', icon: Code2, color: 'bg-blue-500/80' },
    { name: 'DevCircle', type: 'Development Club', members: 85, desc: 'Web and mobile app development projects.', icon: Code2, color: 'bg-purple-500/80' },
    { name: 'AI Society', type: 'Research Club', members: 60, desc: 'AI/ML research, reading groups, projects.', icon: Star, color: 'bg-green-500/80' },
    { name: 'Cipher Squad', type: 'Cyber Security', members: 45, desc: 'CTF competitions, ethical hacking practice.', icon: Trophy, color: 'bg-orange-500/80' },
]

const alumni = [
    { name: 'Aakash Ramesh', batch: '2018', company: 'Google', role: 'Software Engineer', package: '₹42 LPA' },
    { name: 'Keerthi Suresh', batch: '2019', company: 'Microsoft', role: 'Senior Dev', package: '₹38 LPA' },
    { name: 'Naveen Kumar', batch: '2017', company: 'Startup (YC funded)', role: 'CTO & Co-Founder', package: '—' },
    { name: 'Dhivya Priya', batch: '2020', company: 'Amazon', role: 'SDE-II', package: '₹28 LPA' },
]

export default function StudentCorner() {
    return (
        <div className="min-h-screen" style={{
            backgroundImage: 'url(/bg-login.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }}>
            <section className="bg-gradient-to-br from-black/60 via-black/50 to-black/60 py-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl font-heading font-bold text-white mb-6">Student <span className="text-blue-300">Corner</span></h1>
                        <p className="text-white/80 text-xl">Clubs, communities, and alumni success stories.</p>
                    </motion.div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Student Clubs</h2>
                    <p className="text-white/60 text-center mb-12 text-lg">Join a community and grow beyond academics</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {clubs.map((club, i) => (
                            <motion.div key={club.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-white/10">
                                <div className={`w-14 h-14 rounded-xl ${club.color} backdrop-blur-sm flex items-center justify-center mb-4`}>
                                    <club.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-white font-bold font-heading mb-1">{club.name}</h3>
                                <p className="text-blue-300 text-xs mb-2">{club.type}</p>
                                <p className="text-white/60 text-sm mb-3">{club.desc}</p>
                                <div className="flex items-center gap-1 text-white/50 text-xs">
                                    <Users className="w-3 h-3" />{club.members} members
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Alumni Success</h2>
                    <p className="text-white/60 text-center mb-12 text-lg">Our graduates making a difference worldwide</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {alumni.map((a, i) => (
                            <motion.div key={a.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-white/10">
                                <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold font-heading text-xl mb-4">
                                    {a.name[0]}{a.name.split(' ')[1][0]}
                                </div>
                                <h3 className="text-white font-semibold font-heading">{a.name}</h3>
                                <p className="text-blue-300 text-xs mt-0.5">{a.company} — {a.role}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-white/40 text-xs">Batch {a.batch}</span>
                                    <span className="text-green-400 text-xs font-semibold">{a.package}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
