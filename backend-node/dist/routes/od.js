"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.odRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
exports.odRouter = (0, express_1.Router)();
exports.odRouter.get('/', (_req, res) => {
    res.json(data_js_1.odRequests);
});
exports.odRouter.get('/my', (req, res) => {
    const { rollNo } = req.query;
    if (!rollNo) {
        return res.status(400).json({ error: 'rollNo is required' });
    }
    const requests = data_js_1.odRequests.filter(r => r.rollNo === rollNo);
    res.json(requests);
});
exports.odRouter.post('/', (req, res) => {
    const { rollNo, name, date, session, purpose } = req.body;
    if (!rollNo || !name || !date || !session || !purpose) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const maxId = data_js_1.odRequests.length > 0 ? Math.max(...data_js_1.odRequests.map(r => r.id)) : 0;
    const newRequest = {
        id: maxId + 1,
        rollNo,
        name,
        year: req.body.year || 'III',
        section: req.body.section || 'A',
        date,
        session,
        purpose,
        facultyName: req.body.facultyName || 'Dr. Meenakshi Sundaram',
        status: 'pending',
        submittedAt: new Date().toISOString(),
        timeline: [
            { status: 'pending', date: new Date().toLocaleString(), comment: 'Request submitted' }
        ]
    };
    data_js_1.odRequests.unshift(newRequest);
    res.status(201).json(newRequest);
});
exports.odRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { status, comment, approvedBy } = req.body;
    const index = data_js_1.odRequests.findIndex(r => r.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Request not found' });
    }
    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }
    data_js_1.odRequests[index].status = status;
    data_js_1.odRequests[index].timeline.push({
        status,
        date: new Date().toLocaleString(),
        comment: comment || `Request ${status}`,
        approvedBy: approvedBy || null
    });
    res.json(data_js_1.odRequests[index]);
});
exports.odRouter.get('/pending', (_req, res) => {
    const pending = data_js_1.odRequests.filter(r => r.status === 'pending');
    res.json(pending);
});
