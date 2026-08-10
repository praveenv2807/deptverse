import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Cpu } from 'lucide-react'
import { labs } from '../data/data'

const semesters = {
    'Semester 1': ['Engineering Mathematics I', 'Physics', 'C Programming', 'Engineering Graphics'],
    'Semester 2': ['Engineering Mathematics II', 'Chemistry', 'Data Structures', 'Digital Electronics'],
    'Semester 3': ['Discrete Mathematics', 'OOPs with Java', 'Computer Architecture', 'Database Systems'],
    'Semester 4': ['Operating Systems', 'Computer Networks', 'System Software', 'Design & Analysis of Algorithms'],
    'Semester 5': ['Artificial Intelligence', 'Machine Learning', 'Software Engineering', 'Web Technologies'],
    'Semester 6': ['Cloud Computing', 'Cyber Security', 'Mobile Application Development', 'Open Elective'],
    'Semester 7': ['Deep Learning', 'Big Data Analytics', 'Professional Elective I', 'Project Phase I'],
    'Semester 8': ['Internet of Things', 'Professional Elective II', 'Project Phase II'],
}

export default function CurriculumLabs() {
    const [activeSem, setActiveSem] = useState('Semester 1')

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
                        <h1 className="text-4xl font-heading font-bold text-white mb-6">Curriculum & <span className="text-blue-300">Labs</span></h1>
                        <p className="text-white/80 text-xl">Comprehensive syllabus and world-class laboratory infrastructure.</p>
                    </motion.div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Course Curriculum</h2>
                    <p className="text-white/60 text-center mb-12 text-lg">B.E. CSE — Semester-wise subjects</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {Object.keys(semesters).map((sem) => (
                            <button key={sem} onClick={() => setActiveSem(sem)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSem === sem ? 'bg-blue-500 text-white' : 'bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800/80 border border-white/10'
                                    }`}>
                                {sem}
                            </button>
                        ))}
                    </div>
                    <motion.div key={activeSem} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {semesters[activeSem].map((subject, i) => (
                            <div key={subject} className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 hover:shadow-xl transition-all border border-white/10">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm mb-3">
                                    {i + 1}
                                </div>
                                <p className="text-white text-sm font-medium">{subject}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Our Laboratories</h2>
                    <p className="text-white/60 text-center mb-12 text-lg">State-of-the-art facilities for hands-on learning</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {labs.map((lab, i) => (
                            <motion.div key={lab.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center mb-4">
                                    <Monitor className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-white font-semibold font-heading mb-2">{lab.name}</h3>
                                <div className="flex gap-4 text-sm text-white/60 mb-3">
                                    <span><Cpu className="w-3 h-3 inline mr-1" />{lab.systems} Systems</span>
                                    <span>Est. {lab.year}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {lab.software.map((sw) => (
                                        <span key={sw} className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">{sw}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
