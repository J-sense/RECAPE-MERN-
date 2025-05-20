import config from '../../config';
import AcademicSemester from '../AcademinSenmester/acSemester.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { User } from './user.model';
import { generatedId, generatedIdForFaculty } from './user.utilis';

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
const createFacultyIntoDb = async (password: string, facultyData: TFaculty) => {
  let user: NewUser = { password: '', role: '', id: '' };
  user.password = password || (config.default_password as string);
  user.role = 'faculty';
  user.id = await generatedIdForFaculty();

  const result = await User.create(user);
  if (Object.keys(result).length) {
    facultyData.user = result._id;
    facultyData.id = result.id;
    const createFaculty = await Faculty.create(facultyData);
    return createFaculty;
  }
};
export const UserServices = {
  createStudent,
  createFacultyIntoDb,
};
