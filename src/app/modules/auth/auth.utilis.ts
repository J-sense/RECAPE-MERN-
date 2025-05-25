import jwt from 'jsonwebtoken';
export const createToken = (
  data: {
    userId: string;
    userRole: string;
  },
  secret: string,
  expiresdate: number,
) => {
  return jwt.sign(data, secret, { expiresIn: expiresdate });
};
