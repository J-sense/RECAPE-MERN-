import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utilis/carchAsync';
import AppError from '../error';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/auth/auth.const';
import { User } from '../modules/user/user.model';
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
    }
    jwt.verify(
      token,
      config.jwt_access as string,
      async function (err, decode) {
        const { userId, userRole, iat } = decode as JwtPayload;
        const user = await User.isUserExists(userId);
        if (
          user.changePasswordAt &&
          (await User.isPasswordTimeChanged(
            iat as number,
            user?.changePasswordAt,
          ))
        ) {
          throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
        }
        if (requiredRoles && !requiredRoles.includes(userRole)) {
          throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
        }
        req.user = decode as JwtPayload;
        next();
      },
    );
  });
};
export default auth;
