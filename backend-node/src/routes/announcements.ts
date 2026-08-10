import { Router } from 'express';
import { announcements } from '../data/data.js';

export const announcementRouter = Router();

announcementRouter.get('/', (_req, res) => {
  res.json(announcements);
});

announcementRouter.get('/:id', (req, res) => {
  const announcement = announcements.find(a => a.id === parseInt(req.params.id));
  if (!announcement) {
    return res.status(404).json({ error: 'Announcement not found' });
  }
  res.json(announcement);
});

announcementRouter.post('/', (req, res) => {
  const { type, title, content, postedBy, priority } = req.body;
  
  if (!type || !title || !content || !postedBy) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newAnnouncement = {
    id: announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1,
    type,
    title,
    content,
    postedBy,
    date: new Date().toISOString().split('T')[0],
    priority: priority || 'normal'
  };
  
  announcements.unshift(newAnnouncement);
  res.status(201).json(newAnnouncement);
});

announcementRouter.delete('/:id', (req, res) => {
  const index = announcements.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Announcement not found' });
  }
  
  announcements.splice(index, 1);
  res.json({ message: 'Announcement deleted successfully' });
});
