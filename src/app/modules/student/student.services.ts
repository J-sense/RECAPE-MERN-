import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../error';
import status from 'http-status';
import { User } from '../user/user.model';

const createStudent = async (studentData: TStudent) => {
  const result = await Student.create(studentData);
  return result;
};
const getAllStudent = async (query: Record<string, unknown>) => {
  // {email:{$regex: query.searchTerm,$options:1}}
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const result = await Student.find({
    $or: ['email', 'presentAddress', 'name.firstName'].map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i',
      },
    })),
  })
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
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(status.BAD_REQUEST, 'Student not deleted');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, 'User not deleted');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};
export const studentService = {
  createStudent,
  getSingleStudent,
  getAllStudent,
  deleteStudent,
};
