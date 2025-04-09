import express from 'express';
import { studentController } from './student.controller';
const router = express.Router();
router.post('/create-student', studentController.studentCreate);
router.get('/:id', studentController.getSingleStudent);
export const studentRoutes = router;
