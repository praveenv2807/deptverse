import { Router, Request, Response } from 'express';
import { placementDrives, companies, studentApplications, students } from '../data/data.js';

const router = Router();

router.get('/drives', (req: Request, res: Response) => {
  const { status, year } = req.query;
  let drives = [...placementDrives];
  
  if (status) {
    drives = drives.filter(d => d.status === status);
  }
  if (year) {
    drives = drives.filter(d => d.eligibleYears.includes(year as string));
  }
  
  const drivesWithCompany = drives.map(drive => {
    const company = companies.find(c => c.id === drive.companyId);
    return { ...drive, company };
  });
  
  res.json(drivesWithCompany);
});

router.get('/drives/:id', (req: Request, res: Response) => {
  const drive = placementDrives.find(d => d.id === parseInt(req.params.id));
  if (!drive) {
    return res.status(404).json({ error: 'Drive not found' });
  }
  const company = companies.find(c => c.id === drive.companyId);
  const applications = studentApplications
    .filter(a => a.driveId === drive.id)
    .map(a => {
      const student = students.find(s => s.id === a.studentId);
      return { ...a, student };
    });
  res.json({ ...drive, company, applications });
});

router.get('/my-applications', (req: Request, res: Response) => {
  const studentRollNo = req.query.studentRollNo as string;
  if (!studentRollNo) {
    return res.status(400).json({ error: 'studentRollNo is required' });
  }
  
  const student = students.find(s => s.rollNo === studentRollNo);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  const applications = studentApplications
    .filter(a => a.studentId === student.id)
    .map(a => {
      const drive = placementDrives.find(d => d.id === a.driveId);
      const company = companies.find(c => c.id === drive?.companyId);
      return { ...a, drive, company };
    });
  
  res.json(applications);
});

router.post('/apply', (req: Request, res: Response) => {
  const { studentRollNo, driveId } = req.body;
  
  const student = students.find(s => s.rollNo === studentRollNo);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  const drive = placementDrives.find(d => d.id === driveId);
  if (!drive) {
    return res.status(404).json({ error: 'Drive not found' });
  }
  
  if (drive.status === 'completed') {
    return res.status(400).json({ error: 'Cannot apply to completed drive' });
  }
  
  const existing = studentApplications.find(
    a => a.studentId === student.id && a.driveId === driveId
  );
  if (existing) {
    return res.status(400).json({ error: 'Already applied' });
  }
  
  const newApplication = {
    id: studentApplications.length + 1,
    studentId: student.id,
    driveId,
    status: 'applied',
    interviewDate: null,
    package: null
  };
  
  studentApplications.push(newApplication);
  drive.applications++;
  
  res.status(201).json(newApplication);
});

router.get('/stats', (_req: Request, res: Response) => {
  const totalPlaced = studentApplications.filter(a => a.status === 'selected').length;
  const totalApplications = studentApplications.length;
  const upcomingDrives = placementDrives.filter(d => d.status === 'upcoming').length;
  const avgPackage = studentApplications
    .filter(a => a.status === 'selected' && a.package)
    .reduce((sum, a) => sum + (a.package || 0), 0) / totalPlaced || 0;
  
  res.json({
    totalPlaced,
    totalApplications,
    upcomingDrives,
    avgPackage: Math.round(avgPackage * 10) / 10
  });
});

export { router as placementRouter };
