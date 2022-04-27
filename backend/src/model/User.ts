import { Schema, model, Model } from 'mongoose';
import { IUser, UserType } from '../types';

// An interface that describes what attributes a user model should have
interface UserModel extends Model<IUser> {
  build(attrs: IUser): IUser;
}

// Creating user schema
const UserSchema = new Schema<IUser, UserModel>(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: UserType.Admin,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
    timestamps: true,
  }
);

// Statics
UserSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

// Creating user model
const User = model<IUser>('User', UserSchema);

export { User };
