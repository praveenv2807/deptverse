import { Router, Request, Response } from 'express';
import { attendance, subjects, students } from '../data/data.js';

const router = Router();

const attendanceRecords: any[] = [];

router.get('/', (req: Request, res: Response) => {
  const studentRollNo = req.query.studentRollNo as string;
  if (studentRollNo) {
    const student = students.find(s => s.rollNo === studentRollNo);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const studentAttendance = attendance
      .filter(a => a.studentId === student.id)
      .map(a => {
        const subject = subjects.find(s => s.id === a.subjectId);
        const percentage = Math.round((a.attended / a.totalClasses) * 100);
        return { ...a, subject: subject?.name, percentage };
      });
    return res.json(studentAttendance);
  }
  res.json(attendance);
});

router.post('/', (req: Request, res: Response) => {
  const { studentId, subjectId, attended, totalClasses } = req.body;
  const newRecord = {
    id: attendance.length + 1,
    studentId,
    subjectId,
    attended,
    totalClasses
  };
  attendance.push(newRecord);
  res.status(201).json(newRecord);
});

router.post('/submit', (req: Request, res: Response) => {
  const { classId, className, section, date, records } = req.body;
  
  if (!records || !Array.isArray(records)) {
    return res.status(400).json({ error: 'Invalid attendance records' });
  }

  const newAttendanceRecord = {
    id: attendanceRecords.length + 1,
    classId,
    className,
    section,
    date,
    records,
    submittedAt: new Date().toISOString()
  };

  attendanceRecords.push(newAttendanceRecord);
  res.status(201).json({ message: 'Attendance submitted successfully', record: newAttendanceRecord });
});

export { router as attendanceRouter };
