import { Response } from 'express';

export const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number;
    message?: string;
    success?: boolean;
    data?: T;
  },
) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
