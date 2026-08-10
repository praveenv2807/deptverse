"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feeRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
const router = (0, express_1.Router)();
exports.feeRouter = router;
router.get('/', (req, res) => {
    const studentRollNo = req.query.studentRollNo;
    if (studentRollNo) {
        const student = data_js_1.students.find(s => s.rollNo === studentRollNo);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const studentFees = data_js_1.feeRecords.filter(f => f.studentId === student.id);
        return res.json(studentFees);
    }
    res.json(data_js_1.feeRecords);
});
