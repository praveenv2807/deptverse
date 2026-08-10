"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
const router = (0, express_1.Router)();
exports.attendanceRouter = router;
const attendanceRecords = [];
router.get('/', (req, res) => {
    const studentRollNo = req.query.studentRollNo;
    if (studentRollNo) {
        const student = data_js_1.students.find(s => s.rollNo === studentRollNo);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const studentAttendance = data_js_1.attendance
            .filter(a => a.studentId === student.id)
            .map(a => {
            const subject = data_js_1.subjects.find(s => s.id === a.subjectId);
            const percentage = Math.round((a.attended / a.totalClasses) * 100);
            return { ...a, subject: subject?.name, percentage };
        });
        return res.json(studentAttendance);
    }
    res.json(data_js_1.attendance);
});
router.post('/', (req, res) => {
    const { studentId, subjectId, attended, totalClasses } = req.body;
    const newRecord = {
        id: data_js_1.attendance.length + 1,
        studentId,
        subjectId,
        attended,
        totalClasses
    };
    data_js_1.attendance.push(newRecord);
    res.status(201).json(newRecord);
});
router.post('/submit', (req, res) => {
    const { classId, className, section, date, records } = req.body;
    if (!records || !Array.isArray(records)) {
        return res.status(400).json({ error: 'Invalid attendance records' });
    }
    const newAttendanceRecord = {
        id: attendanceRecords.length + 1,
        classId,
        className,
        section,
        date,
        records,
        submittedAt: new Date().toISOString()
    };
    attendanceRecords.push(newAttendanceRecord);
    res.status(201).json({ message: 'Attendance submitted successfully', record: newAttendanceRecord });
});
