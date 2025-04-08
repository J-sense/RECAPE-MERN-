import express from 'express';
import { studentController } from './student.controller';
const router = express.Router();
router.post('/create-student', studentController.studentCreate);
export const studentRoutes = router;
