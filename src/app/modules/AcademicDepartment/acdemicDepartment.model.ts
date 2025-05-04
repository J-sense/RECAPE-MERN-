import mongoose, { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './acdemicDepartment.interface';
import AppError from '../../error';
import status from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);
academicDepartmentSchema.pre('save', async function (next) {
  const isAlreadyExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isAlreadyExist) {
    throw new AppError(status.CONFLICT, 'This department does not exist');
  }
  next();
});
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExist = await this.model.findOne(query);
  if (!isExist) {
    throw new AppError(status.NOT_FOUND, 'This department does not exist');
  }
  next();
});
const AcademicDepartment = model(
  'AcademicDepartment',
  academicDepartmentSchema,
);
export default AcademicDepartment;
