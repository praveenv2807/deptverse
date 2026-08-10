import { Router, Request, Response } from 'express';
import { faculty, students, subjects, attendance } from '../data/data.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ faculty });
});

router.get('/:empId', (req: Request, res: Response) => {
  const member = faculty.find(f => f.empId === req.params.empId);
  if (!member) {
    return res.status(404).json({ error: 'Faculty member not found' });
  }
  res.json(member);
});

router.get('/:empId/classes', (req: Request, res: Response) => {
  const member = faculty.find(f => f.empId === req.params.empId);
  if (!member) {
    return res.status(404).json({ error: 'Faculty member not found' });
  }
  
  const classAssignments = [
    { id: 1, subject: 'Data Structures', year: 'III', section: 'A', time: '9:00 - 10:00', room: 'A101', students: 62 },
    { id: 2, subject: 'Operating Systems', year: 'III', section: 'B', time: '11:00 - 12:00', room: 'A102', students: 58 },
    { id: 3, subject: 'DBMS Lab', year: 'III', section: 'A', time: '2:00 - 4:00', room: 'Lab 3', students: 30 },
  ];
  
  res.json(classAssignments);
});

router.get('/:empId/students', (req: Request, res: Response) => {
  const { year, section } = req.query;
  let filtered = [...students];
  
  if (year) {
    filtered = filtered.filter(s => s.year === year);
  }
  if (section) {
    filtered = filtered.filter(s => s.section === section);
  }
  
  const studentsWithAttendance = filtered.map(s => {
    const studentAttendance = attendance.filter(a => a.studentId === s.id);
    const avgAttendance = studentAttendance.length > 0
      ? Math.round(studentAttendance.reduce((sum, a) => sum + (a.attended / a.totalClasses) * 100, 0) / studentAttendance.length)
      : 0;
    return { ...s, avgAttendance };
  });
  
  res.json(studentsWithAttendance);
});

export { router as facultyRouter };
