import config from '../../config';
import AcademicSemester from '../AcademinSenmester/acSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { User } from './user.model';
import generatedId from './user.utilis';

type NewUser = {
  password: string;
  role: string;
  id: string;
};
const createStudent = async (password: string, studentData: TStudent) => {
  const user: NewUser = {
    password: '',
    role: '',
    id: '',
  };
  if (!password) {
    user.password = config.default_password as string;
  } else {
    user.password = password;
  }
  const findAcademicSemesterData = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  user.role = 'student';
  user.id = await generatedId(findAcademicSemesterData);
  const result = await User.create(user);
  if (!result) {
    throw new Error('User not exist');
  }
  if (Object.keys(result).length) {
    studentData.user = result._id;
    studentData.id = user.id;
    const student = await Student.create(studentData);
    return student;
  }
};
export const UserServices = {
  createStudent,
};
