"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
const router = (0, express_1.Router)();
exports.statsRouter = router;
router.get('/', (_req, res) => {
    const totalStudents = data_js_1.students.length;
    const totalFaculty = data_js_1.faculty.length;
    const allAttendance = data_js_1.attendance.map(a => ({
        percentage: Math.round((a.attended / a.totalClasses) * 100)
    }));
    const avgAttendance = Math.round(allAttendance.reduce((sum, a) => sum + a.percentage, 0) / allAttendance.length);
    const latestPlacement = data_js_1.placementStats[data_js_1.placementStats.length - 1];
    const placementRate = latestPlacement?.percentage || 0;
    res.json({
        totalStudents,
        totalFaculty,
        avgAttendance,
        placementRate
    });
});
