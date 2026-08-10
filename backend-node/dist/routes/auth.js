"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_js_1 = require("../data/data.js");
const router = (0, express_1.Router)();
exports.authRouter = router;
const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'faculty', password: 'faculty123', role: 'faculty' },
    { id: 3, username: 'student', password: 'student123', role: 'student' },
];
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let userData = null;
    const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
    if (user) {
        if (user.password === password) {
            userData = { id: user.id, username: user.username, role: user.role };
        }
    }
    if (!userData) {
        const student = data_js_1.students.find((s) => s.rollNo === username);
        if (student) {
            if (student.password === password) {
                userData = { id: student.id, username: student.rollNo, role: 'student', name: student.name };
            }
        }
    }
    if (!userData) {
        const fac = data_js_1.faculty.find((f) => f.empId === username);
        if (fac) {
            if (fac.password === password) {
                userData = { id: fac.id, username: fac.empId, role: 'faculty', name: fac.name };
            }
        }
    }
    if (!userData) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ id: userData.id, username: userData.username, role: userData.role, name: userData.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    res.json({ token, user: { id: userData.id, username: userData.username, role: userData.role, name: userData.name } });
});
router.get('/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        res.json({ user: decoded });
    }
    catch {
        res.status(401).json({ error: 'Invalid token' });
    }
});
