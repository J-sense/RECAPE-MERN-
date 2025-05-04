import express from 'express';
import { studentController } from './student.controller';
const router = express.Router();
router.post('/create-student', studentController.studentCreate);
router.get('/all-students', studentController.getAllStudent);
router.get('/:id', studentController.getSingleStudent);
router.delete('/:id', studentController.deleteStudent);
export const studentRoutes = router;
