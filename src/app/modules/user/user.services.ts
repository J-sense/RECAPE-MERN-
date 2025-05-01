import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { User } from './user.model';

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
  user.role = 'student';
  user.id = 'student123';
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
