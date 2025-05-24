import { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utilis/carchAsync';
import { sendResponse } from '../../utilis/sendResponse';
import status from 'http-status';
import { authService } from './auth.service';

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  await sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User Login Successfully',
    data: result,
  });
});
const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = req?.user as JwtPayload;
    const result = await authService.changePassword(user, payload);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Password changed successfully',
      success: true,
      data: result,
    });
  },
);
export const authController = {
  login,
  changePassword,
};
