import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../error/hadleZodError';
import handleCastError from '../error/handleCastError';
export type TerrorSource = {
  path: string | null;
  message: string;
}[];
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const success = false;
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorSource: TerrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statuscode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statuscode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  }
  res.status(statusCode).json({
    success,
    message,
    errorSource,
    stack: err?.stack ? err.stack : null,
  });
};

export default globalErrorHandler;
