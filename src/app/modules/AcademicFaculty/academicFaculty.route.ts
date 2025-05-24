import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.const';
const router = express.Router();
router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);
router.get(
  '/all-academic-faculty',
  auth(USER_ROLE.faculty),
  academicFacultyController.allAcademicFaculty,
);
router.get(
  '/all-academic-faculty/:id',
  academicFacultyController.singleAcademicFaculty,
);
router.patch(
  '/academic-faculty/:id',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyController.updatesingleAcademicFaculty,
);

export const academicFacultyRoutes = router;
