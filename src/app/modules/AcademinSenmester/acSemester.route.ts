import express from 'express';
import { academicSemesterController } from './acSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './acSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.AcademicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester,
);
export const academicSemesterRoutes = router;
