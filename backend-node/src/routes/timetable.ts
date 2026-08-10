import { Router, Request, Response } from 'express';
import { timetable } from '../data/data.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { year, section, day } = req.query;
  let filtered = [...timetable];
  
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

export { router as timetableRouter };
