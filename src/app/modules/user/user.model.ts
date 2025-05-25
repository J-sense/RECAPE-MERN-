import { model, Schema } from 'mongoose';
import { TUser, UserModelType } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser, UserModelType>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    changePasswordAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', async function (next) {
  let user = this;
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_round),
  );
  next();
});
userSchema.statics.isUserExists = async function (id: string) {
  return await User.findOne({ id });
};
userSchema.statics.isPasswordTimeChanged = async function (
  iat: number,
  changePassAt: Date,
) {
  const convertartchangepassAt = new Date(changePassAt).getTime() / 1000;
  return convertartchangepassAt > iat;
};
export const User = model<TUser, UserModelType>('User', userSchema);
