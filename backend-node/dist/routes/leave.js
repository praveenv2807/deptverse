"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
exports.leaveRouter = (0, express_1.Router)();
exports.leaveRouter.get('/', (_req, res) => {
    res.json(data_js_1.leaveRequests);
});
exports.leaveRouter.get('/my', (req, res) => {
    const { rollNo } = req.query;
    if (!rollNo) {
        return res.status(400).json({ error: 'rollNo is required' });
    }
    const requests = data_js_1.leaveRequests.filter(r => r.rollNo === rollNo);
    res.json(requests);
});
exports.leaveRouter.post('/', (req, res) => {
    const { rollNo, name, fromDate, toDate, reason, type } = req.body;
    if (!rollNo || !name || !fromDate || !toDate || !reason || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const maxId = data_js_1.leaveRequests.length > 0 ? Math.max(...data_js_1.leaveRequests.map(r => r.id)) : 0;
    const newRequest = {
        id: maxId + 1,
        rollNo,
        name,
        year: req.body.year || 'III',
        section: req.body.section || 'A',
        fromDate,
        toDate,
        reason,
        type,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        timeline: [
            { status: 'pending', date: new Date().toLocaleString(), comment: 'Request submitted' }
        ]
    };
    data_js_1.leaveRequests.unshift(newRequest);
    res.status(201).json(newRequest);
});
exports.leaveRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { status, comment, approvedBy } = req.body;
    const index = data_js_1.leaveRequests.findIndex(r => r.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Request not found' });
    }
    if (!['pending', 'faculty_approved', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }
    data_js_1.leaveRequests[index].status = status;
    data_js_1.leaveRequests[index].timeline.push({
        status,
        date: new Date().toLocaleString(),
        comment: comment || `Request ${status.replace('_', ' ')}`,
        approvedBy: approvedBy || null
    });
    res.json(data_js_1.leaveRequests[index]);
});
exports.leaveRouter.get('/pending', (req, res) => {
    const { forType } = req.query;
    if (forType === 'admin') {
        const pending = data_js_1.leaveRequests.filter(r => r.status === 'faculty_approved');
        return res.json(pending);
    }
    const pending = data_js_1.leaveRequests.filter(r => r.status === 'pending');
    res.json(pending);
});
