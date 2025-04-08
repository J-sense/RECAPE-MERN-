import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudent = async (studentData: Student) => {
  const result = await StudentModel.create(studentData);
  return result;
};
export const studentService = {
  createStudent,
};
