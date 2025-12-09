import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isActive: boolean;
}

export interface IUserMethods {
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface IcreateUserPayload {
  name:string,
  email:string,
  password:string
}
export interface ILoginPayload {
  email:string,
  password:string
}

export type UserModel = Model<IUser, {}, IUserMethods>;
