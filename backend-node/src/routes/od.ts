import { Router } from 'express';
import { odRequests } from '../data/data.js';

export const odRouter = Router();

odRouter.get('/', (_req, res) => {
  res.json(odRequests);
});

odRouter.get('/my', (req, res) => {
  const { rollNo } = req.query;
  if (!rollNo) {
    return res.status(400).json({ error: 'rollNo is required' });
  }
  
  const requests = odRequests.filter(r => r.rollNo === rollNo);
  res.json(requests);
});

odRouter.post('/', (req, res) => {
  const { rollNo, name, date, session, purpose } = req.body;
  
  if (!rollNo || !name || !date || !session || !purpose) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const maxId = odRequests.length > 0 ? Math.max(...odRequests.map(r => r.id)) : 0;
  
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
  
  odRequests.unshift(newRequest);
  res.status(201).json(newRequest);
});

odRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status, comment, approvedBy } = req.body;
  
  const index = odRequests.findIndex(r => r.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }
  
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  odRequests[index].status = status;
  odRequests[index].timeline.push({
    status,
    date: new Date().toLocaleString(),
    comment: comment || `Request ${status}`,
    approvedBy: approvedBy || null
  });
  
  res.json(odRequests[index]);
});

odRouter.get('/pending', (_req, res) => {
  const pending = odRequests.filter(r => r.status === 'pending');
  res.json(pending);
});
