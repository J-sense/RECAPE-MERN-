import { Response, Request, NextFunction, RequestHandler } from 'express';
import { UserServices } from './user.services';
import { sendResponse } from '../../utilis/sendResponse';
import status from 'http-status';
import { catchAsync } from '../../utilis/carchAsync';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, student } = req.body;
    const result = await UserServices.createStudent(password, student);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  },
);
const createFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, faculty } = req.body;
    const result = await UserServices.createFacultyIntoDb(password, faculty);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Faculty created succesfully',
      data: result,
    });
  },
);
export const UserController = {
  createStudent,
  createFaculty,
};
