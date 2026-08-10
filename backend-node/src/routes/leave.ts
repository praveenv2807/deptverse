import { Router } from 'express';
import { leaveRequests } from '../data/data.js';

export const leaveRouter = Router();

leaveRouter.get('/', (_req, res) => {
  res.json(leaveRequests);
});

leaveRouter.get('/my', (req, res) => {
  const { rollNo } = req.query;
  if (!rollNo) {
    return res.status(400).json({ error: 'rollNo is required' });
  }
  
  const requests = leaveRequests.filter(r => r.rollNo === rollNo);
  res.json(requests);
});

leaveRouter.post('/', (req, res) => {
  const { rollNo, name, fromDate, toDate, reason, type } = req.body;
  
  if (!rollNo || !name || !fromDate || !toDate || !reason || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const maxId = leaveRequests.length > 0 ? Math.max(...leaveRequests.map(r => r.id)) : 0;
  
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
  
  leaveRequests.unshift(newRequest);
  res.status(201).json(newRequest);
});

leaveRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status, comment, approvedBy } = req.body;
  
  const index = leaveRequests.findIndex(r => r.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }
  
  if (!['pending', 'faculty_approved', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  leaveRequests[index].status = status;
  leaveRequests[index].timeline.push({
    status,
    date: new Date().toLocaleString(),
    comment: comment || `Request ${status.replace('_', ' ')}`,
    approvedBy: approvedBy || null
  });
  
  res.json(leaveRequests[index]);
});

leaveRouter.get('/pending', (req, res) => {
  const { forType } = req.query;
  
  if (forType === 'admin') {
    const pending = leaveRequests.filter(r => r.status === 'faculty_approved');
    return res.json(pending);
  }
  
  const pending = leaveRequests.filter(r => r.status === 'pending');
  res.json(pending);
});
