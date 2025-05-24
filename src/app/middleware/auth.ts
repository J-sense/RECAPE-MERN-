import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utilis/carchAsync';
import AppError from '../error';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
    }
    jwt.verify(token, config.jwt_access as string, function (err, decode) {
      //   const { userId, userRole } = decode as JwtPayload;
      req.user = decode as JwtPayload;
    });
    next();
  });
};
export default auth;
