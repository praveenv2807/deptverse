import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

const faqs = [
    { q: "What programs does CSE offer?", a: "We offer B.E. CSE (4 years), M.E. CSE (2 years), and Ph.D in Computer Science." },
    { q: "How many students are placed?", a: "Our department maintains a 95%+ placement record. Top recruiters include TCS, Infosys, Google, Amazon, and more!" },
    { q: "How do I access the student portal?", a: "Click 'Portal Login' in the navigation bar, select Student, and enter your credentials." },
    { q: "What labs are available?", a: "We have 10+ labs including AI Lab, Cloud Computing Lab, Cyber Security Lab, IoT Lab, and Full Stack Lab." },
    { q: "How do I apply for leave?", a: "Login to the Student Portal → Go to Leave Application section → Fill the form and submit." },
    { q: "Contact HOD?", a: "You can contact the HoD at hod.cse@dept.edu or visit the CSE Block, Room 101." },
]

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { from: 'bot', text: "Hi! I'm DeptBot. How can I help you today?" }
    ])
    const [input, setInput] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(true)
    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = (text = input) => {
        if (!text.trim()) return
        const newMessages = [...messages, { from: 'user', text }]
        setMessages(newMessages)
        setInput('')
        setShowSuggestions(false)

        const matched = faqs.find(f =>
            f.q.toLowerCase().includes(text.toLowerCase()) ||
            text.toLowerCase().includes(f.q.toLowerCase().split(' ')[1] || '')
        )
        setTimeout(() => {
            setMessages(prev => [...prev, {
                from: 'bot',
                text: matched?.a || "I'm not sure about that. Please contact the department office at cse@department.edu.in or call +91 98765 43210."
            }])
        }, 600)
    }

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-xl bg-primary shadow-card flex items-center justify-center transition-all duration-300 hover:bg-primary-dark ${isOpen ? '' : 'hover:-translate-y-1'}`}>
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-card overflow-hidden flex flex-col" style={{ height: '460px' }}>
                    {/* Header */}
                    <div className="bg-primary p-4 flex items-center gap-3">
                        <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h4 className="text-white font-semibold font-heading">DeptBot</h4>
                            <p className="text-white/70 text-xs">CSE Department Assistant</p>
                        </div>
                        <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === 'user'
                                        ? 'bg-primary text-white rounded-br-sm'
                                        : 'bg-white text-slate-700 rounded-bl-sm shadow-card'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Suggestions */}
                        {showSuggestions && (
                            <div className="space-y-2 pt-2">
                                <p className="text-slate-400 text-xs">Quick questions:</p>
                                {faqs.slice(0, 4).map((f) => (
                                    <button key={f.q} onClick={() => handleSend(f.q)}
                                        className="block w-full text-left text-xs bg-white hover:bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 transition-colors">
                                        {f.q}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-slate-200 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask anything..."
                            className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm text-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button onClick={() => handleSend()}
                            className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors">
                            <Send className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
