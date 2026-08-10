import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { healthRouter } from './routes/health.js';
import { studentsRouter } from './routes/students.js';
import { attendanceRouter } from './routes/attendance.js';
import { resultsRouter } from './routes/results.js';
import { timetableRouter } from './routes/timetable.js';
import { feeRouter } from './routes/fee.js';
import { statsRouter } from './routes/stats.js';
import { placementRouter } from './routes/placement.js';
import { facultyRouter } from './routes/faculty.js';
import { announcementRouter } from './routes/announcements.js';
import { leaveRouter } from './routes/leave.js';
import { odRouter } from './routes/od.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/health', healthRouter);
app.use('/api/students', studentsRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/results', resultsRouter);
app.use('/api/timetable', timetableRouter);
app.use('/api/fee', feeRouter);
app.use('/api/stats', statsRouter);
app.use('/api/placement', placementRouter);
app.use('/api/faculty', facultyRouter);
app.use('/api/announcements', announcementRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/od', odRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
