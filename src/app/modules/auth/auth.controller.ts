import { Request, Response } from 'express';
import { catchAsync } from '../../utilis/carchAsync';
import { sendResponse } from '../../utilis/sendResponse';
import status from 'http-status';
import { authService } from './auth.service';

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  await sendResponse(res, {
    statusCode: status.OK,
    success: false,
    message: 'User Login Successfully',
    data: result,
  });
});
export const authController = {
  login,
};
