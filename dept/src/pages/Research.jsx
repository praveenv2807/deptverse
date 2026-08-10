import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Award, Lightbulb, DollarSign } from 'lucide-react'

const publications = [
    { title: 'Deep Learning for Medical Image Segmentation', authors: 'Dr. Krishnamurthy, Dr. Meenakshi', journal: 'IEEE TMI', year: 2024, type: 'Journal' },
    { title: 'Blockchain-based IoT Security Framework', authors: 'Dr. Arumugam, Ms. Kavitha', journal: 'Elsevier Future Generation', year: 2024, type: 'Journal' },
    { title: 'Federated Learning for Edge Computing', authors: 'Mr. Venkatesh', journal: 'ICML 2024', year: 2024, type: 'Conference' },
    { title: 'NLP-based Sentiment Agriculture Decision System', authors: 'Dr. Meenakshi', journal: 'Applied Soft Computing', year: 2023, type: 'Journal' },
]

const projects = [
    { title: 'AI-based Crop Disease Detection', agency: 'DST', amount: '₹18.5 Lakhs', pi: 'Dr. Krishnamurthy', year: '2023-2025' },
    { title: 'Blockchain for Supply Chain', agency: 'SERB', amount: '₹12.2 Lakhs', pi: 'Dr. Arumugam', year: '2022-2024' },
    { title: 'Smart Campus IoT Security', agency: 'AICTE', amount: '₹8.0 Lakhs', pi: 'Dr. Meenakshi', year: '2023-2025' },
]

export default function Research() {
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
                        <h1 className="text-4xl font-heading font-bold text-white mb-6">Research & <span className="text-blue-300">Achievements</span></h1>
                        <p className="text-white/80 text-xl">Pioneering research across AI, cybersecurity, IoT, and emerging technologies.</p>
                    </motion.div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {[
                            { label: 'Publications', value: '100+', icon: FileText, color: 'text-blue-400' },
                            { label: 'Funded Projects', value: '12', icon: DollarSign, color: 'text-green-400' },
                            { label: 'Patents', value: '8', icon: Lightbulb, color: 'text-purple-400' },
                            { label: 'Awards', value: '25+', icon: Award, color: 'text-orange-400' },
                        ].map(({ label, value, icon: Icon, color }) => (
                            <div key={label} className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 text-center border border-white/10">
                                <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
                                <p className="text-3xl font-bold font-heading text-blue-400">{value}</p>
                                <p className="text-white/60">{label}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-8">Recent Publications</h2>
                    <div className="space-y-4 mb-16">
                        {publications.map((pub, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow border border-white/10">
                                <div className={`text-xs px-2 py-1 rounded-lg font-medium flex-shrink-0 ${pub.type === 'Journal' ? 'bg-blue-500/50 text-blue-200' : 'bg-purple-500/50 text-purple-200'}`}>
                                    {pub.type}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold font-heading">{pub.title}</h3>
                                    <p className="text-white/50 text-sm mt-1">{pub.authors}</p>
                                    <p className="text-blue-400 text-sm mt-1">{pub.journal} • {pub.year}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-8">Funded Projects</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {projects.map((proj, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-white/10">
                                <h3 className="text-white font-semibold font-heading mb-3">{proj.title}</h3>
                                <div className="space-y-2 text-sm">
                                    <p className="text-white/50"><span className="text-white/70">Agency:</span> <span className="text-green-400">{proj.agency}</span></p>
                                    <p className="text-white/50"><span className="text-white/70">Amount:</span> <span className="text-green-400 font-semibold">{proj.amount}</span></p>
                                    <p className="text-white/50"><span className="text-white/70">PI:</span> <span className="text-white/70">{proj.pi}</span></p>
                                    <p className="text-white/50"><span className="text-white/70">Period:</span> <span className="text-white/70">{proj.year}</span></p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
