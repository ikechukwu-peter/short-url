import { Schema, model, type Document } from "mongoose";

// 1. Create an interface/type representing a mongodb Document
export type IUser = {
  _id?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
} & Document;

// 2. Create a schema corresponding to  the mongodb interface/type

const userSchema = new Schema<IUser>(
  {
    email: {
      lowercase: true,
      unique: true,
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const UserModel = model<IUser>("User", userSchema);
