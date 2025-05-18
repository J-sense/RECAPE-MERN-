import mongoose from 'mongoose';

const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statuscode = 400;
  const message = 'Invalid Id ';
  return {
    statuscode,
    message,
    errorSources,
  };
};
export default handleCastError;
