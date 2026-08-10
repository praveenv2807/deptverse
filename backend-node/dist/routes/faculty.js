"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
const router = (0, express_1.Router)();
exports.facultyRouter = router;
router.get('/', (req, res) => {
    res.json({ faculty: data_js_1.faculty });
});
router.get('/:empId', (req, res) => {
    const member = data_js_1.faculty.find(f => f.empId === req.params.empId);
    if (!member) {
        return res.status(404).json({ error: 'Faculty member not found' });
    }
    res.json(member);
});
router.get('/:empId/classes', (req, res) => {
    const member = data_js_1.faculty.find(f => f.empId === req.params.empId);
    if (!member) {
        return res.status(404).json({ error: 'Faculty member not found' });
    }
    const classAssignments = [
        { id: 1, subject: 'Data Structures', year: 'III', section: 'A', time: '9:00 - 10:00', room: 'A101', students: 62 },
        { id: 2, subject: 'Operating Systems', year: 'III', section: 'B', time: '11:00 - 12:00', room: 'A102', students: 58 },
        { id: 3, subject: 'DBMS Lab', year: 'III', section: 'A', time: '2:00 - 4:00', room: 'Lab 3', students: 30 },
    ];
    res.json(classAssignments);
});
router.get('/:empId/students', (req, res) => {
    const { year, section } = req.query;
    let filtered = [...data_js_1.students];
    if (year) {
        filtered = filtered.filter(s => s.year === year);
    }
    if (section) {
        filtered = filtered.filter(s => s.section === section);
    }
    const studentsWithAttendance = filtered.map(s => {
        const studentAttendance = data_js_1.attendance.filter(a => a.studentId === s.id);
        const avgAttendance = studentAttendance.length > 0
            ? Math.round(studentAttendance.reduce((sum, a) => sum + (a.attended / a.totalClasses) * 100, 0) / studentAttendance.length)
            : 0;
        return { ...s, avgAttendance };
    });
    res.json(studentsWithAttendance);
});
