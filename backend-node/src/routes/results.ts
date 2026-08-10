import { Router, Request, Response } from 'express';
import { results, subjects, students } from '../data/data.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const studentRollNo = req.query.studentRollNo as string;
  if (studentRollNo) {
    const student = students.find(s => s.rollNo === studentRollNo);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const studentResults = results
      .filter(r => r.studentId === student.id)
      .map(r => {
        const subject = subjects.find(s => s.id === r.subjectId);
        const total = r.ia1 + r.ia2;
        const grade = total >= 90 ? 'O' : total >= 80 ? 'A+' : total >= 70 ? 'A' : total >= 60 ? 'B+' : 'B';
        return { ...r, subject: subject?.name, total, grade };
      });
    return res.json(studentResults);
  }
  res.json(results);
});

export { router as resultsRouter };
