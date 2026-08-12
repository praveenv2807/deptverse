import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'
import Logo from './Logo'

const footerLinks = {
    'Quick Links': [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Programs', path: '/programs' },
        { label: 'Faculty', path: '/faculty' },
        { label: 'Research', path: '/research' },
    ],
    'Programs': [
        { label: 'B.E. CSE', path: '/programs' },
        { label: 'M.E. CSE', path: '/programs' },
        { label: 'Ph.D', path: '/programs' },
        { label: 'Curriculum', path: '/curriculum-labs' },
        { label: 'Regulations', path: '/curriculum-labs' },
    ],
    'Student': [
        { label: 'Placements', path: '/placements' },
        { label: 'Events', path: '/events' },
        { label: 'Student Corner', path: '/student-corner' },
        { label: 'eLearning', path: '/elearning' },
        { label: 'Portal Login', path: '/login' },
    ],
}

const socials = [
    { Icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { Icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { Icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { Icon: Youtube, href: '#', color: 'hover:text-red-600' },
]

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <Logo size="default" />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Department of Computer Science & Engineering — shaping future technologists through innovation, research, and excellence.
                        </p>
                        <div className="space-y-2 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary-light flex-shrink-0" />
                                <span>CSE Block, Engineering College, Tamil Nadu</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary-light flex-shrink-0" />
                                <span>cse@department.edu.in</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary-light flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </div>
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-white font-semibold font-heading mb-4">{title}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link to={link.path}
                                            className="text-slate-400 hover:text-primary-light text-sm transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © 2025 DeptVerse – CSE Department. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {socials.map(({ Icon, href, color }) => (
                            <a key={href + color} href={href}
                                className={`text-slate-500 ${color} transition-colors`}>
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
