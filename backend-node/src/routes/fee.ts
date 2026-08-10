import { Router, Request, Response } from 'express';
import { feeRecords, students } from '../data/data.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const studentRollNo = req.query.studentRollNo as string;
  if (studentRollNo) {
    const student = students.find(s => s.rollNo === studentRollNo);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const studentFees = feeRecords.filter(f => f.studentId === student.id);
    return res.json(studentFees);
  }
  res.json(feeRecords);
});

export { router as feeRouter };
