import { Request, Response } from 'express';
import { studentService } from './student.services';
import { catchAsync } from '../../utilis/carchAsync';
import { sendResponse } from '../../utilis/sendResponse';
import status from 'http-status';

const studentCreate = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    const result = await studentService.createStudent(student);
    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await studentService.getSingleStudent(id);
    res.status(200).json({
      success: true,
      message: 'Get single Student',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await studentService.deleteStudent(id);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.getAllStudent();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All Student retrieved successfully',
    data: result,
  });
});
export const studentController = {
  studentCreate,
  getSingleStudent,
  getAllStudent,
};
