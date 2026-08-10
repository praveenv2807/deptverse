"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
const router = (0, express_1.Router)();
exports.studentsRouter = router;
router.get('/', (_req, res) => {
    res.json(data_js_1.students);
});
router.get('/:rollNo', (req, res) => {
    const student = data_js_1.students.find(s => s.rollNo === req.params.rollNo);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
});
