import { TAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const allAcademicFaculty = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const singleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const updatesingleAcademicFaculty = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFaculty,
  allAcademicFaculty,
  singleAcademicFaculty,
  updatesingleAcademicFaculty,
};
