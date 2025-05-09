import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
export const notFound = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    error: '',
  });
};
