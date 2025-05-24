import express from 'express';
import { authController } from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './auth.const';
import validateRequest from '../../middleware/validateRequest';
import { changePasswordValidation } from './auth.validation';

const router = express.Router();
router.post('/login', authController.login);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(changePasswordValidation.changePasswordValidationSchema),
  authController.changePassword,
);
const authRoutes = router;
export default authRoutes;
