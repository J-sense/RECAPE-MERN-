import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicDepartmentValidation } from './acdemicDepartment.validation';
import { academicDepartmentController } from './acdemicDepartment.controller';
const router = express.Router();
router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidation.academicDepartmentValidationSchema,
  ),
  academicDepartmentController.createAcademicDepartment,
);
router.get(
  '/all-academic-department',
  academicDepartmentController.allAcademicDepartment,
);
router.get(
  '/academic-department/:id',
  academicDepartmentController.singleAcademicDepartment,
);
router.patch(
  '/academic-department/:id',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.updatesingleAcademicDepartment,
);

export const academicDepartmentRoutes = router;
