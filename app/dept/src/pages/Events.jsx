import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, MapPin, X } from 'lucide-react'

const events = [
    { id: 1, title: 'AI/ML Workshop', type: 'Workshop', date: 'March 15, 2025', venue: 'Seminar Hall A', participants: 120, description: 'Hands-on workshop on Machine Learning using Python, Scikit-learn and TensorFlow.', status: 'Upcoming' },
    { id: 2, title: 'Symposium – TechNova 2025', type: 'Symposium', date: 'April 5, 2025', venue: 'Main Auditorium', participants: 500, description: 'Annual national-level technical symposium with paper presentations, project expo, and coding events.', status: 'Upcoming' },
    { id: 3, title: 'Cyber Security Seminar', type: 'Seminar', date: 'Feb 10, 2025', venue: 'Lab 3', participants: 60, description: 'Expert talk on ethical hacking, penetration testing and modern cybersecurity tools.', status: 'Completed' },
    { id: 4, title: 'Smart India Hackathon', type: 'Hackathon', date: 'May 20, 2025', venue: 'Innovation Hub', participants: 200, description: 'National-level hackathon organized by MoE. Our department sends top 5 teams.', status: 'Upcoming' },
    { id: 5, title: 'Cloud Computing Workshop', type: 'Workshop', date: 'Jan 28, 2025', venue: 'Cloud Lab', participants: 45, description: 'AWS certified instructor-led workshop on cloud fundamentals, EC2, and Lambda.', status: 'Completed' },
    { id: 6, title: 'Alumni Connect 2025', type: 'Alumni', date: 'June 8, 2025', venue: 'Open Amphitheatre', participants: 300, description: 'Annual alumni meet with career talks, networking sessions, and mentorship opportunities.', status: 'Upcoming' },
]

const typeColors = {
    Workshop: 'bg-blue-500/50 text-blue-200',
    Symposium: 'bg-purple-500/50 text-purple-200',
    Seminar: 'bg-green-500/50 text-green-200',
    Hackathon: 'bg-orange-500/50 text-orange-200',
    Alumni: 'bg-pink-500/50 text-pink-200',
}

export default function Events() {
    const [filter, setFilter] = useState('All')
    const [selected, setSelected] = useState(null)

    const types = ['All', 'Workshop', 'Symposium', 'Seminar', 'Hackathon', 'Alumni']
    const filtered = filter === 'All' ? events : events.filter(e => e.type === filter)

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
                        <h1 className="text-4xl font-heading font-bold text-white mb-6">Events & <span className="text-blue-300">Gallery</span></h1>
                        <p className="text-white/80 text-xl">Workshops, seminars, hackathons, and more — learn beyond the classroom.</p>
                    </motion.div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {types.map((t) => (
                            <button key={t} onClick={() => setFilter(t)}
                                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${filter === t ? 'bg-blue-500 text-white' : 'bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800/80 border border-white/10'
                                    }`}>
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((event, i) => (
                            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                                onClick={() => setSelected(event)}
                                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${typeColors[event.type]}`}>
                                        {event.type}
                                    </span>
                                    <span className={`text-xs font-medium ${event.status === 'Upcoming' ? 'text-green-400' : 'text-white/40'}`}>
                                        • {event.status}
                                    </span>
                                </div>
                                <h3 className="text-white font-semibold font-heading mb-3">{event.title}</h3>
                                <p className="text-white/60 text-sm line-clamp-2 mb-4">{event.description}</p>
                                <div className="space-y-1 text-xs text-white/50">
                                    <div className="flex items-center gap-2"><Calendar className="w-3 h-3" />{event.date}</div>
                                    <div className="flex items-center gap-2"><MapPin className="w-3 h-3" />{event.venue}</div>
                                    <div className="flex items-center gap-2"><Users className="w-3 h-3" />{event.participants} participants</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {selected && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-slate-900/95 backdrop-blur-md w-full max-w-lg rounded-xl shadow-lg p-8 relative border border-white/10" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg text-white/60">
                            <X className="w-5 h-5" />
                        </button>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium mb-4 inline-block ${typeColors[selected.type]}`}>{selected.type}</span>
                        <h2 className="text-2xl font-heading font-bold text-white mb-3">{selected.title}</h2>
                        <p className="text-white/70 leading-relaxed mb-6">{selected.description}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="bg-slate-800/60 p-3 rounded-lg text-center border border-white/10">
                                <Calendar className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                                <p className="text-white/50 text-xs">Date</p>
                                <p className="text-white text-xs font-medium">{selected.date}</p>
                            </div>
                            <div className="bg-slate-800/60 p-3 rounded-lg text-center border border-white/10">
                                <MapPin className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                                <p className="text-white/50 text-xs">Venue</p>
                                <p className="text-white text-xs font-medium">{selected.venue}</p>
                            </div>
                            <div className="bg-slate-800/60 p-3 rounded-lg text-center border border-white/10">
                                <Users className="w-4 h-4 text-green-400 mx-auto mb-1" />
                                <p className="text-white/50 text-xs">Participants</p>
                                <p className="text-white text-xs font-medium">{selected.participants}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
