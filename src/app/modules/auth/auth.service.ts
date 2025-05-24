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
const changePassword = async (
  user: any,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const loggedUser = await User.isUserExists(user.userId);
  const isPasswordMatch = bcrypt.compare(
    loggedUser.password as string,
    payload.oldPassword,
  );
  if (!isPasswordMatch) {
    throw new AppError(status.NOT_FOUND, 'Password does not matched');
  }
  const hashPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  );
  const findUserAndUpdate = await User.findOneAndUpdate(
    {
      id: loggedUser.id,
      role: loggedUser.role,
    },
    {
      password: hashPassword,
      needsPasswordChange: false,
    },
  );
  console.log(findUserAndUpdate);
  return null;
};
export const authService = {
  login,
  changePassword,
};
