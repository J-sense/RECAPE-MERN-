import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name is required and should be string',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty is required',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name is required and should be string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty is required',
      })
      .optional(),
  }),
});
export const academicDepartmentValidation = {
  academicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
