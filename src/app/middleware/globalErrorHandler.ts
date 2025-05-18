import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
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
  const handleZodError = (err: ZodError) => {
    const errorSources = err.issues.map((issue) => {
      return {
        path: issue?.path[issue?.path.length - 1] as string,
        message: issue?.message,
      };
    });
    const statuscode = 400;
    const message = 'Validation Error';
    return {
      statuscode,
      message,
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statuscode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  }
  res.status(statusCode).json({
    success,
    message,
    errorSource,
  });
};

export default globalErrorHandler;
