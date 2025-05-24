export const USER_ROLE = {
  admin: 'admin',
  faculty: 'faculty',
  student: 'student',
} as const;
export type TUserRole = keyof typeof USER_ROLE;
