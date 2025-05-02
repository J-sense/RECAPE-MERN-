import { TAcademicSemester } from './acSemester.interface';
import AcademicSemester from './acSemester.model';

const createAcademicSemester = async (payload: TAcademicSemester) => {
  const isSemesterExist = await AcademicSemester.findOne({
    name: payload.name,
    year: payload.year,
  });
  const mapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };
  if (mapper[payload.name] !== payload.name) {
    if (isSemesterExist) {
      throw new Error('Something went wrong');
    }
  }
  if (isSemesterExist) {
    throw new Error('Semester already exist');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemester,
};
