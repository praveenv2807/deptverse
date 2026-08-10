import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, CheckCircle2, ChevronDown, FileText } from 'lucide-react'
import { programs } from '../data/data'

const levelColors = {
    UG: 'bg-blue-500',
    PG: 'bg-purple-500',
    PhD: 'bg-green-500',
}

export default function Programs() {
    const [active, setActive] = useState('UG')
    const filtered = programs.filter(p => p.level === active)

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
                        <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/30">
                            Academic Programs
                        </div>
                        <h1 className="text-4xl font-heading font-bold text-white mb-6">
                            Our <span className="text-blue-300">Programs</span>
                        </h1>
                        <p className="text-white/80 text-xl leading-relaxed">
                            Comprehensive programs designed to build future-ready computer science professionals.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <div className="flex justify-center gap-3 mb-12">
                        {['UG', 'PG', 'PhD'].map((level) => (
                            <button key={level} onClick={() => setActive(level)}
                                className={`px-8 py-3 rounded-lg font-semibold font-heading transition-all duration-200 ${active === level
                                        ? `${levelColors[level]} text-white shadow-lg`
                                        : 'bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800/80 border border-white/10'
                                    }`}>
                                {level}
                            </button>
                        ))}
                    </div>

                    {filtered.map((prog) => (
                        <motion.div key={prog.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-8 mb-6 max-w-4xl mx-auto border border-white/10">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    <div className={`inline-block ${levelColors[prog.level]} text-sm px-4 py-1.5 rounded-full font-bold mb-4 text-white`}>
                                        {prog.level}
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold text-white mb-4">{prog.name}</h2>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                            <Clock className="w-5 h-5 text-blue-400 mb-2" />
                                            <p className="text-white/60 text-xs mb-1">Duration</p>
                                            <p className="text-white font-semibold">{prog.duration}</p>
                                        </div>
                                        <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                            <Users className="w-5 h-5 text-purple-400 mb-2" />
                                            <p className="text-white/60 text-xs mb-1">Intake</p>
                                            <p className="text-white font-semibold">{prog.intake} Students</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-white/60 text-sm mb-2">Eligibility</p>
                                        <p className="text-white bg-slate-800/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">{prog.eligibility}</p>
                                    </div>

                                    <div>
                                        <p className="text-white/60 text-sm mb-3">Program Highlights</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {prog.highlights.map((h) => (
                                                <div key={h} className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                    <span className="text-white/70 text-sm">{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-72">
                                    <p className="text-white/60 text-sm mb-3">Semester Structure</p>
                                    <div className="space-y-2">
                                        {Array.from({ length: prog.level === 'UG' ? 8 : prog.level === 'PG' ? 4 : 6 }, (_, i) => (
                                            <div key={i} className="bg-slate-800/60 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-700/60 transition-colors border border-white/10">
                                                <span className="text-white/70 text-sm font-medium">Semester {i + 1}</span>
                                                <ChevronDown className="w-4 h-4 text-white/50" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Regulations & Downloads</h2>
                        <p className="text-white/60 text-center mb-12 text-lg">Course regulations and academic documents</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Regulation 2021', 'Regulation 2017', 'Syllabus B.E.', 'Syllabus M.E.'].map((doc) => (
                                <button key={doc} className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 text-white/70 hover:text-blue-300 hover:shadow-xl transition-all border border-white/10 flex items-center justify-center gap-2">
                                    <FileText className="w-4 h-4" /> {doc}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
