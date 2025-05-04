import { Request, Response } from 'express';
import { catchAsync } from '../../utilis/carchAsync';
import { sendResponse } from '../../utilis/sendResponse';
import status from 'http-status';
import { academicDepartmentServices } from './acdemicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentServices.createAcademicDepartment(
      req.body,
    );
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Academic Department created successfully',
      data: result,
    });
  },
);
const allAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentServices.allAcademicDepartment();
    sendResponse(res, {
      statusCode: status.OK,
      message: 'All Academic Department retrieved successfully',
      data: result,
    });
  },
);
const singleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await academicDepartmentServices.singleAcademicDepartment(id);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Single Academic Department retrieved successfully',
      data: result,
    });
  },
);
const updatesingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result =
      await academicDepartmentServices.updatesingleAcademicDepartment(
        id,
        payload,
      );

    sendResponse(res, {
      statusCode: status.OK,
      message: 'Academic Department updated successfully',
      data: result,
    });
  },
);

export const academicDepartmentController = {
  updatesingleAcademicDepartment,
  singleAcademicDepartment,
  allAcademicDepartment,
  createAcademicDepartment,
};
