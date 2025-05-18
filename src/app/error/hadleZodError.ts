import { ZodError } from 'zod';

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
export default handleZodError;
