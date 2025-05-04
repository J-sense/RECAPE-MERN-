import { TAcademicSemester } from '../AcademinSenmester/acSemester.interface';
import { User } from './user.model';

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};
const generatedId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudent();
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);
  const currentStudentYear = payload.year;
  const currentStudentCode = payload.code;

  if (
    lastStudentId &&
    lastStudentYear == currentStudentYear &&
    lastStudentCode == currentStudentCode
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
export default generatedId;
