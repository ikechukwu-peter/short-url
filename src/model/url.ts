import { Schema, SchemaTypes, model, type Document } from "mongoose";

// 1. Create an interface/type representing a mongodb Document
export type IURL = {
  originalUrl: string;
  shortUrl?: string;
  customUrl?: string;
  password?: string;
  isPasswordEnabled: boolean;
  expiresAt?: Date;
  createdAt: string;
  updatedAt: string;
  totalClicks: number;
  user?: string;
} & Document;

// 2. Create a schema corresponding to  the mongodb interface/type

const urlSchema = new Schema<IURL>(
  {
    user: { type: SchemaTypes.ObjectId, ref: "User" },
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, unique: true, sparse: true },
    password: { type: String },
    expiresAt: { type: Date },
    totalClicks: { type: Number, default: 0 },
    customUrl: { type: String, unique: true, sparse: true },
    isPasswordEnabled: { type: Boolean, default: false },
  },
  {
    autoIndex: true,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// TTL
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const URLModel = model<IURL>("URL", urlSchema);
