import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudent = async (studentData: Student) => {
  const result = await StudentModel.create(studentData);
  return result;
};
const getSingleStudent = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
const deleteStudent = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};
export const studentService = {
  createStudent,
  getSingleStudent,
  deleteStudent,
};
