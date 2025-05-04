import { Request, Response } from 'express';
import { catchAsync } from '../../utilis/carchAsync';
import { academicFacultyServices } from './academicFaculty.service';
import { sendResponse } from '../../utilis/sendResponse';
import status from 'http-status';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyServices.createAcademicFaculty(
      req.body,
    );
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  },
);
const allAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyServices.allAcademicFaculty();
  sendResponse(res, {
    statusCode: status.OK,
    message: 'All Academic Faculty retrieved successfully',
    data: result,
  });
});
const singleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicFacultyServices.singleAcademicFaculty(id);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Single Academic Faculty retrieved successfully',
      data: result,
    });
  },
);
const updatesingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await academicFacultyServices.updatesingleAcademicFaculty(
      id,
      payload,
    );

    sendResponse(res, {
      statusCode: status.OK,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  },
);

export const academicFacultyController = {
  createAcademicFaculty,
  allAcademicFaculty,
  singleAcademicFaculty,
  updatesingleAcademicFaculty,
};
