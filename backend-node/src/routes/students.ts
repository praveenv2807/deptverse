import { Router, Request, Response } from 'express';
import { students } from '../data/data.js';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(students);
});

router.get('/:rollNo', (req: Request, res: Response) => {
  const student = students.find(s => s.rollNo === req.params.rollNo);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

export { router as studentsRouter };
