import { User } from "./user.model.ts";
import bcrypt from "bcrypt";
import { ApiError } from "../../utils/ApiError.ts";

export const generateAccessorRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = await User.generateAccessToken(userId)
    const refreshToken = await User.generateRefreshToken(userId)

    await user?.save({validateBeforeSave:false})
    return {accessToken,refreshToken}
  } catch (error: any) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

export const createUser = async (payload: any) => {
  const { name, email, password } = payload;

  if (!name) {
    throw new ApiError(400, "Name is required.");
  }
  if (!email) {
    throw new ApiError(400, "Email is required.");
  }
  if (!password) {
    throw new ApiError(400, "Password is required.");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new ApiError(400, "User already exists.");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return newUser;
};
