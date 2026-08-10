import { Router, Request, Response } from 'express';
import { students, faculty, attendance, placementStats } from '../data/data.js';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  
  const allAttendance = attendance.map(a => ({
    percentage: Math.round((a.attended / a.totalClasses) * 100)
  }));
  const avgAttendance = Math.round(
    allAttendance.reduce((sum, a) => sum + a.percentage, 0) / allAttendance.length
  );
  
  const latestPlacement = placementStats[placementStats.length - 1];
  const placementRate = latestPlacement?.percentage || 0;

  res.json({
    totalStudents,
    totalFaculty,
    avgAttendance,
    placementRate
  });
});

export { router as statsRouter };
