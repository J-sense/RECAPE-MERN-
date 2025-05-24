import { z } from 'zod';

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'old password is required' }),
    newPassword: z.string({ required_error: 'new password is required' }),
  }),
});
export const changePasswordValidation = {
  changePasswordValidationSchema,
};
