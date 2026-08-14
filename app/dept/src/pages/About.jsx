import React from 'react'
import { motion } from 'framer-motion'
import { Target, Lightbulb, Award, Clock } from 'lucide-react'

const timeline = [
    { year: '2004', event: 'Department established with 60 UG seats' },
    { year: '2008', event: 'PG program (M.E. CSE) introduced' },
    { year: '2012', event: 'PhD program launched with research labs' },
    { year: '2016', event: 'NBA Accreditation achieved' },
    { year: '2019', event: 'AI & Cloud Computing labs inaugurated' },
    { year: '2022', event: 'Cyber Security Centre of Excellence established' },
    { year: '2024', event: '95%+ placement record achieved' },
]

export default function About() {
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
                            About Us
                        </div>
                        <h1 className="text-4xl font-heading font-bold text-white mb-6">
                            About the <span className="text-blue-300">Department</span>
                        </h1>
                        <p className="text-white/80 text-xl leading-relaxed">
                            Two decades of excellence in Computer Science & Engineering education, research, and industry connect.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Vision & Mission</h2>
                    <p className="text-white/60 text-center mb-12 text-lg">Our guiding principles</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-8 border-l-4 border-l-blue-400 border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center">
                                    <Target className="w-6 h-6 text-blue-300" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-white">Vision</h3>
                            </div>
                            <p className="text-white/70 leading-relaxed text-lg italic">
                                "To be a world-class center of excellence in Computer Science and Engineering education, research, and innovation, producing globally competent engineers and researchers."
                            </p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-8 border-l-4 border-l-purple-400 border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/30 flex items-center justify-center">
                                    <Lightbulb className="w-6 h-6 text-purple-300" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-white">Mission</h3>
                            </div>
                            <ul className="text-white/70 leading-relaxed space-y-3">
                                {[
                                    'Impart quality education through innovative teaching methodologies.',
                                    'Foster research culture and encourage publications.',
                                    'Provide industry-oriented training and internships.',
                                    'Develop ethical, responsible, and technically sound engineers.',
                                ].map((m, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-purple-300 mt-1">▸</span> {m}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">HoD's Message</h2>
                    <p className="text-white/60 text-center mb-12 text-lg">A word from our department head</p>
                    <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-10 max-w-4xl mx-auto border-t-4 border-t-blue-400 border border-white/10">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0">
                                <div className="w-28 h-28 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold font-heading text-3xl">
                                    RK
                                </div>
                            </div>
                            <div>
                                <blockquote className="text-white/80 text-lg italic leading-relaxed mb-6">
                                    "It gives me immense pleasure to present the CSE Department — a vibrant hub of learning, innovation, and growth. Our faculty are dedicated mentors, our students are passionate learners, and together, we strive to make a meaningful impact on the world of computing. I welcome students to join our community and be part of our journey towards excellence."
                                </blockquote>
                                <div>
                                    <p className="text-white font-bold font-heading text-xl">Dr. V. Sharmila</p>
                                    <p className="text-blue-300 font-medium">Professor & Head, Department of CSE</p>
                                    <p className="text-white/50 text-sm mt-1">Ph.D (CSE), | 22 Years Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Department History</h2>
                    <p className="text-white/60 text-center mb-12 text-lg">Our journey through the years</p>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-blue-400/30" />
                        <div className="space-y-8">
                            {timeline.map(({ year, event }, i) => (
                                <motion.div key={year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                    className="flex items-start gap-6 pl-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 flex-1 hover:shadow-xl transition-shadow border border-white/10">
                                        <span className="text-blue-300 font-bold font-heading text-xl">{year}</span>
                                        <p className="text-white/70 mt-1">{event}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">Accreditations & Recognition</h2>
                    <p className="text-white/60 text-center mb-12 text-lg">Recognized for excellence</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['NBA Accredited', 'NAAC A++', 'ISO 9001:2015', 'AICTE Approved'].map((item) => (
                            <motion.div key={item} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow border border-white/10">
                                <Award className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                                <p className="text-white font-semibold font-heading">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
