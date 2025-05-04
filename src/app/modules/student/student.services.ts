import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudent = async (studentData: TStudent) => {
  const result = await Student.create(studentData);
  return result;
};
const getAllStudent = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
const deleteStudent = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const studentService = {
  createStudent,
  getSingleStudent,
  getAllStudent,
  deleteStudent,
};
