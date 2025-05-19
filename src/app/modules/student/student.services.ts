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
  const queryObj = { ...query };

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const excludes = ['searchTerm'];
  excludes.forEach((el) => delete queryObj[el]);
  const searchQuery = Student.find({
    $or: ['email', 'presentAddress', 'name.firstName'].map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i',
      },
    })),
  });

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  let sort = '-createdAt';
  if (query?.sort) {
    sort = query.sort as string;
  }
  const sorting = await filterQuery.sort(sort);
  return sorting;
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
