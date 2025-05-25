import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh: process.env.JWT_REFRESH_TOKEN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  jwt_access_expires_in: process.env.JWT_REFRESH_ACCESS_EXPIRES_IN,
};
