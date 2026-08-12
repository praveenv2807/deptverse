import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Play, Copy, Check, Terminal, BookOpen, RefreshCw, X } from 'lucide-react'

const languages = [
    {
        id: 'c',
        name: 'C Programming',
        icon: 'C',
        color: 'bg-blue-500',
        description: 'Learn fundamentals of C programming',
        topics: ['Variables & Data Types', 'Control Statements', 'Functions', 'Arrays', 'Pointers', 'Structures'],
        boilerplate: `#include <stdio.h>

int main() {
    // Write your code here
    printf("Hello, World!");
    return 0;
}`,
        hints: ['Use printf() to print output', 'Don\'t forget the semicolon ;', 'Return 0 at the end']
    },
    {
        id: 'cpp',
        name: 'C++ Programming',
        icon: 'C++',
        color: 'bg-blue-600',
        description: 'Master C++ with OOP concepts',
        topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'STL', 'Templates', 'Exception Handling'],
        boilerplate: `#include <iostream>
using namespace std;

int main() {
    // Write your codehere
    cout << "Hello, World!";
    return 0;
}`,
        hints: ['Use cout for output', 'Include <iostream> header', 'Use using namespace std;']
    },
    {
        id: 'python',
        name: 'Python',
        icon: 'PY',
        color: 'bg-yellow-500',
        description: 'Learn Python for AI, ML & Web',
        topics: ['Python Basics', 'Data Types', 'Functions', 'OOP', 'NumPy', 'File Handling'],
        boilerplate: `# Write your code here
print("Hello, World!")`,
        hints: ['Use print() function', 'No semicolons needed', 'Indentation matters!']
    },
    {
        id: 'java',
        name: 'Java',
        icon: 'JA',
        color: 'bg-red-500',
        description: 'Enterprise Java programming',
        topics: ['Java Basics', 'OOP', 'Collections', 'Multithreading', 'JDBC', 'Spring'],
        boilerplate: `public class Main {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello, World!");
    }
}`,
        hints: ['Use System.out.println()', 'Class name should match file', 'Everything in main method']
    },
]

const problems = [
    { id: 1, title: 'Hello World', difficulty: 'Easy', lang: ['c', 'cpp', 'python', 'java'], description: 'Print "Hello, World!" to the console', hint: 'Use the appropriate print function for your language' },
    { id: 2, title: 'Sum of Two Numbers', difficulty: 'Easy', lang: ['c', 'cpp', 'python', 'java'], description: 'Add two numbers and print the result', hint: 'Declare variables and use + operator' },
    { id: 3, title: 'Even or Odd', difficulty: 'Easy', lang: ['c', 'cpp', 'python', 'java'], description: 'Check if a number is even or odd', hint: 'Use modulo operator %' },
    { id: 4, title: 'Factorial', difficulty: 'Medium', lang: ['c', 'cpp', 'python', 'java'], description: 'Calculate factorial of a number', hint: 'Use a loop or recursion' },
    { id: 5, title: 'Fibonacci Series', difficulty: 'Medium', lang: ['c', 'cpp', 'python', 'java'], description: 'Print first N fibonacci numbers', hint: 'Use two variables to track previous numbers' },
    { id: 6, title: 'Palindrome Check', difficulty: 'Medium', lang: ['c', 'cpp', 'python', 'java'], description: 'Check if a string/number is palindrome', hint: 'Compare string with its reverse' },
]

export default function Practice() {
    const [activeLang, setActiveLang] = useState('c')
    const [code, setCode] = useState(languages[0].boilerplate)
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)
    const [selectedProblem, setSelectedProblem] = useState(null)
    const [showHint, setShowHint] = useState(false)

    const currentLang = languages.find(l => l.id === activeLang)

    const handleLanguageChange = (langId) => {
        setActiveLang(langId)
        const lang = languages.find(l => l.id === langId)
        setCode(lang.boilerplate)
        setOutput('')
        setSelectedProblem(null)
        setShowHint(false)
    }

    const handleRun = () => {
        setOutput('Hello, World!\n\n[Output simulated - In production, this would connect to a code execution engine]')
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleReset = () => {
        setCode(currentLang.boilerplate)
        setOutput('')
        setShowHint(false)
    }

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
                            Practice Platform
                        </div>
                        <h1 className="text-4xl font-heading font-bold text-white mb-6">
                            Programming <span className="text-blue-300">Practice</span>
                        </h1>
                        <p className="text-white/80 text-xl">
                            Learn and practice C, C++, Python, and Java with interactive coding challenges.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section>
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {languages.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => handleLanguageChange(lang.id)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeLang === lang.id 
                                    ? `${lang.color} text-white shadow-lg` 
                                    : 'bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800/80 border border-white/10'
                                }`}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 flex items-center justify-between border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg ${currentLang.color} flex items-center justify-center text-white font-bold`}>
                                        {currentLang.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{currentLang.name}</h3>
                                        <p className="text-white/50 text-xs">{currentLang.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={handleReset} className="p-2 text-white/50 hover:text-blue-300 hover:bg-slate-800/60 rounded-lg" title="Reset code">
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                    <button onClick={handleCopy} className="p-2 text-white/50 hover:text-blue-300 hover:bg-slate-800/60 rounded-lg" title="Copy code">
                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10">
                                <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-white/10">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-white/50 text-sm ml-2">{
                                        activeLang === 'python' ? 'main.py' :
                                        activeLang === 'cpp' ? 'main.cpp' :
                                        activeLang === 'java' ? 'Main.java' :
                                        'main.c'
                                    }</span>
                                </div>
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full h-80 bg-slate-900 text-slate-200 font-mono text-sm p-4 resize-none focus:outline-none"
                                    spellCheck={false}
                                />
                            </div>

                            <button 
                                onClick={handleRun}
                                className={`w-full py-3 rounded-lg font-semibold text-white ${currentLang.color} flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                            >
                                <Play className="w-5 h-5" /> Run Code
                            </button>

                            <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
                                <div className="flex items-center gap-2 mb-3 p-4 border-b border-white/10">
                                    <Terminal className="w-4 h-4 text-blue-400" />
                                    <span className="text-white font-semibold">Output</span>
                                </div>
                                <pre className="bg-slate-900 text-green-400 font-mono text-sm p-4 rounded-b-xl min-h-[100px] overflow-auto">
                                    {output || 'Click "Run Code" to see output...'}
                                </pre>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-white/10">
                                <div className="flex items-center gap-2 mb-4">
                                    <BookOpen className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-white font-semibold">Topics</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {currentLang.topics.map((topic, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-800/60 text-white/70 text-xs rounded-lg border border-white/10">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-white/10">
                                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Code className="w-5 h-5 text-blue-400" /> Practice Problems
                                </h3>
                                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                                    {problems.filter(p => p.lang.includes(activeLang)).map((problem) => (
                                        <button
                                            key={problem.id}
                                            onClick={() => { setSelectedProblem(problem); setShowHint(false); }}
                                            className={`w-full text-left p-3 rounded-xl border transition-all ${
                                                selectedProblem?.id === problem.id 
                                                ? 'bg-blue-500/20 border-blue-400' 
                                                : 'bg-slate-800/60 border-white/10 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-white text-sm font-medium">{problem.title}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                    problem.difficulty === 'Easy' ? 'bg-green-500/50 text-green-200' :
                                                    problem.difficulty === 'Medium' ? 'bg-yellow-500/50 text-yellow-200' :
                                                    'bg-red-500/50 text-red-200'
                                                }`}>
                                                    {problem.difficulty}
                                                </span>
                                            </div>
                                            <p className="text-white/50 text-xs mt-1">{problem.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedProblem && (
                                <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-blue-400/50">
                                    <h4 className="text-white font-semibold mb-2">{selectedProblem.title}</h4>
                                    <p className="text-white/60 text-sm mb-3">{selectedProblem.description}</p>
                                    <button 
                                        onClick={() => setShowHint(!showHint)}
                                        className="text-blue-300 text-sm hover:underline"
                                    >
                                        {showHint ? 'Hide Hint' : 'Show Hint'}
                                    </button>
                                    {showHint && (
                                        <div className="mt-2 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                                            <p className="text-yellow-200 text-sm">{selectedProblem.hint}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
