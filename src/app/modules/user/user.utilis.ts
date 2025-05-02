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
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};
const generatedId = async (payload: TAcademicSemester) => {
  const currentId = (await findLastStudent()) || '0'.toString();
  let newId = Number(currentId + 1)
    .toString()
    .padStart(4, '0');
  newId = `${payload.year}${payload.code}${newId}`;
  return newId;
};
export default generatedId;
