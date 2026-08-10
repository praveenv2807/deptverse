"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timetableRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
const router = (0, express_1.Router)();
exports.timetableRouter = router;
router.get('/', (req, res) => {
    const { year, section, day } = req.query;
    let filtered = [...data_js_1.timetable];
    if (year) {
        filtered = filtered.filter(t => t.year === year);
    }
    if (section) {
        filtered = filtered.filter(t => t.section === section);
    }
    if (day) {
        filtered = filtered.filter(t => t.day === day);
    }
    res.json(filtered);
});
