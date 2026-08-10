"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placementRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
const router = (0, express_1.Router)();
exports.placementRouter = router;
router.get('/drives', (req, res) => {
    const { status, year } = req.query;
    let drives = [...data_js_1.placementDrives];
    if (status) {
        drives = drives.filter(d => d.status === status);
    }
    if (year) {
        drives = drives.filter(d => d.eligibleYears.includes(year));
    }
    const drivesWithCompany = drives.map(drive => {
        const company = data_js_1.companies.find(c => c.id === drive.companyId);
        return { ...drive, company };
    });
    res.json(drivesWithCompany);
});
router.get('/drives/:id', (req, res) => {
    const drive = data_js_1.placementDrives.find(d => d.id === parseInt(req.params.id));
    if (!drive) {
        return res.status(404).json({ error: 'Drive not found' });
    }
    const company = data_js_1.companies.find(c => c.id === drive.companyId);
    const applications = data_js_1.studentApplications
        .filter(a => a.driveId === drive.id)
        .map(a => {
        const student = data_js_1.students.find(s => s.id === a.studentId);
        return { ...a, student };
    });
    res.json({ ...drive, company, applications });
});
router.get('/my-applications', (req, res) => {
    const studentRollNo = req.query.studentRollNo;
    if (!studentRollNo) {
        return res.status(400).json({ error: 'studentRollNo is required' });
    }
    const student = data_js_1.students.find(s => s.rollNo === studentRollNo);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    const applications = data_js_1.studentApplications
        .filter(a => a.studentId === student.id)
        .map(a => {
        const drive = data_js_1.placementDrives.find(d => d.id === a.driveId);
        const company = data_js_1.companies.find(c => c.id === drive?.companyId);
        return { ...a, drive, company };
    });
    res.json(applications);
});
router.post('/apply', (req, res) => {
    const { studentRollNo, driveId } = req.body;
    const student = data_js_1.students.find(s => s.rollNo === studentRollNo);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    const drive = data_js_1.placementDrives.find(d => d.id === driveId);
    if (!drive) {
        return res.status(404).json({ error: 'Drive not found' });
    }
    if (drive.status === 'completed') {
        return res.status(400).json({ error: 'Cannot apply to completed drive' });
    }
    const existing = data_js_1.studentApplications.find(a => a.studentId === student.id && a.driveId === driveId);
    if (existing) {
        return res.status(400).json({ error: 'Already applied' });
    }
    const newApplication = {
        id: data_js_1.studentApplications.length + 1,
        studentId: student.id,
        driveId,
        status: 'applied',
        interviewDate: null,
        package: null
    };
    data_js_1.studentApplications.push(newApplication);
    drive.applications++;
    res.status(201).json(newApplication);
});
router.get('/stats', (_req, res) => {
    const totalPlaced = data_js_1.studentApplications.filter(a => a.status === 'selected').length;
    const totalApplications = data_js_1.studentApplications.length;
    const upcomingDrives = data_js_1.placementDrives.filter(d => d.status === 'upcoming').length;
    const avgPackage = data_js_1.studentApplications
        .filter(a => a.status === 'selected' && a.package)
        .reduce((sum, a) => sum + (a.package || 0), 0) / totalPlaced || 0;
    res.json({
        totalPlaced,
        totalApplications,
        upcomingDrives,
        avgPackage: Math.round(avgPackage * 10) / 10
    });
});
