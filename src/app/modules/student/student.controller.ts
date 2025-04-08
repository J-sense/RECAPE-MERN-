import { Request, Response } from 'express';
import { studentService } from './student.services';

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
export const studentController = {
  studentCreate,
};
