import { Response, Request, NextFunction } from 'express';
import { UserServices } from './user.services';
import { sendResponse } from '../../utilis/sendResponse';
import status from 'http-status';
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;
    const result = await UserServices.createStudent(password, student);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const UserController = {
  createStudent,
};
