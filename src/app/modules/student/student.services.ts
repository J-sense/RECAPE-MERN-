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
  const queryObj = { ...query };

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const excludes = ['searchTerm', 'sort', 'limit', 'page', 'skip'];
  excludes.forEach((el) => delete queryObj[el]);

  // Build the base query
  let dbQuery = Student.find({
    $or: ['email', 'presentAddress', 'name.firstName'].map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i',
      },
    })),
  });

  // Apply filters
  dbQuery = dbQuery.find(queryObj);

  // Apply population
  dbQuery = dbQuery.populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  // Apply sorting
  let sort = '-createdAt';
  if (query?.sort) {
    sort = query.sort as string;
  }
  dbQuery = dbQuery.sort(sort);

  // Execute the query
  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = query.limit as number;
  }
  if (query?.page || query.skip) {
    page = Number(query.page);
    skip = Number(query?.skip);
    skip = (page - 1) * limit;
  }
  dbQuery = dbQuery.skip(skip);
  const result = await dbQuery.limit(limit);

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
