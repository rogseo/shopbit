import { Schema, model, models } from 'mongoose';


const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps:true,
  }
);


const User = models.User || model("User", userSchema);
export default User;

export interface IUser {
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthUser extends IUser {
  token: string;
}