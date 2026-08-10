"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
const router = (0, express_1.Router)();
exports.resultsRouter = router;
router.get('/', (req, res) => {
    const studentRollNo = req.query.studentRollNo;
    if (studentRollNo) {
        const student = data_js_1.students.find(s => s.rollNo === studentRollNo);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const studentResults = data_js_1.results
            .filter(r => r.studentId === student.id)
            .map(r => {
            const subject = data_js_1.subjects.find(s => s.id === r.subjectId);
            const total = r.ia1 + r.ia2;
            const grade = total >= 90 ? 'O' : total >= 80 ? 'A+' : total >= 70 ? 'A' : total >= 60 ? 'B+' : 'B';
            return { ...r, subject: subject?.name, total, grade };
        });
        return res.json(studentResults);
    }
    res.json(data_js_1.results);
});
