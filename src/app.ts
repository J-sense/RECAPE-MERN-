import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notfound';
import { academicSemesterRoutes } from './app/modules/AcademinSenmester/acSemester.route';
import { academicFacultyRoutes } from './app/modules/AcademicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from './app/modules/AcademicDepartment/acdemicDepartment.route';
const app: Application = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/academicSemester', academicSemesterRoutes);
app.use('/api/v1/academicFaculty', academicFacultyRoutes);
app.use('/api/v1/academicDepartment', academicDepartmentRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
