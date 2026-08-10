"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementRouter = void 0;
const express_1 = require("express");
const data_js_1 = require("../data/data.js");
exports.announcementRouter = (0, express_1.Router)();
exports.announcementRouter.get('/', (_req, res) => {
    res.json(data_js_1.announcements);
});
exports.announcementRouter.get('/:id', (req, res) => {
    const announcement = data_js_1.announcements.find(a => a.id === parseInt(req.params.id));
    if (!announcement) {
        return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json(announcement);
});
exports.announcementRouter.post('/', (req, res) => {
    const { type, title, content, postedBy, priority } = req.body;
    if (!type || !title || !content || !postedBy) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newAnnouncement = {
        id: data_js_1.announcements.length > 0 ? Math.max(...data_js_1.announcements.map(a => a.id)) + 1 : 1,
        type,
        title,
        content,
        postedBy,
        date: new Date().toISOString().split('T')[0],
        priority: priority || 'normal'
    };
    data_js_1.announcements.unshift(newAnnouncement);
    res.status(201).json(newAnnouncement);
});
exports.announcementRouter.delete('/:id', (req, res) => {
    const index = data_js_1.announcements.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Announcement not found' });
    }
    data_js_1.announcements.splice(index, 1);
    res.json({ message: 'Announcement deleted successfully' });
});
