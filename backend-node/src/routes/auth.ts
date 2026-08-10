import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { students, faculty } from '../data/data.js';

const router = Router();

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'faculty', password: 'faculty123', role: 'faculty' },
  { id: 3, username: 'student', password: 'student123', role: 'student' },
];

interface AuthRequest extends Request {
  user?: { id: number; username: string; role: string };
}

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  let userData: { id: number; username: string; role: string; name?: string } | null = null;

  const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
  if (user) {
    if (user.password === password) {
      userData = { id: user.id, username: user.username, role: user.role };
    }
  }

  if (!userData) {
    const student = students.find((s) => s.rollNo === username);
    if (student) {
      if (student.password === password) {
        userData = { id: student.id, username: student.rollNo, role: 'student', name: student.name };
      }
    }
  }

  if (!userData) {
    const fac = faculty.find((f) => f.empId === username);
    if (fac) {
      if (fac.password === password) {
        userData = { id: fac.id, username: fac.empId, role: 'faculty', name: fac.name };
      }
    }
  }

  if (!userData) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: userData.id, username: userData.username, role: userData.role, name: userData.name },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' }
  );

  res.json({ token, user: { id: userData.id, username: userData.username, role: userData.role, name: userData.name } });
});

router.get('/me', (req: AuthRequest, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: number; username: string; role: string };
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export { router as authRouter };
