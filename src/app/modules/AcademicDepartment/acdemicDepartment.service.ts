import { TAcademicDepartment } from './acdemicDepartment.interface';
import AcademicDepartment from './acdemicDepartment.model';

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
const allAcademicDepartment = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const singleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
const updatesingleAcademicDepartment = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartment,
  updatesingleAcademicDepartment,
  singleAcademicDepartment,
  allAcademicDepartment,
};
