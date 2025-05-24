import status from 'http-status';
import AppError from '../../error';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
type TLogin = {
  id: string;
  password: string;
};

const login = async (payload: TLogin) => {
  const isUserExist = await User.isUserExists(payload?.id);

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.status !== 'in-progress') {
    throw new AppError(status.BAD_REQUEST, 'User is blocked');
  }

  if (isUserExist.isDeleted === true) {
    throw new AppError(status.BAD_REQUEST, 'User is deleted');
  }

  const isPasswordCompared = await bcrypt.compare(
    payload.password,
    isUserExist.password as string,
  );

  if (!isPasswordCompared) {
    throw new AppError(status.UNAUTHORIZED, 'Password not matched');
  }
  const jwtPayload = {
    userId: isUserExist?.id,
    userRole: isUserExist?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access as string, {
    expiresIn: '10d',
  });
  return {
    accessToken,
    needsPasswordChange: isUserExist?.needsPasswordChange,
  };
};

export const authService = {
  login,
};
