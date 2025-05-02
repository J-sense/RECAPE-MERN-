import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utilis/carchAsync';
import { sendResponse } from '../../utilis/sendResponse';
import { academicSemesterServices } from './acSemester.service';
import status from 'http-status';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await academicSemesterServices.createAcademicSemester(
      req.body,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
  },
);
export const academicSemesterController = {
  createAcademicSemester,
};
