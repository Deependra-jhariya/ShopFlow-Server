import { ApiError } from "../../utils/ApiError.ts";
import bcrypt from "bcrypt";
import { User } from "./user.model.ts";
import { type IcreateUserPayload, type ILoginPayload } from "./user.types.ts";

export const generateAccessorRefreshToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(400, "User not found.");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    await user?.save({ validateBeforeSave: false });

    if (!accessToken && !refreshToken) {
      throw new ApiError(400, "AccessToken and refreshToken not generated");
    }

    return { accessToken, refreshToken };
  } catch (error: any) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const createUserService = async (payload: IcreateUserPayload) => {
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

  const user = User.findById(newUser._id).select("-password");

  return user;
};

const loginService = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  if (!email) {
    throw new ApiError(400, "Email is required. ");
  }
  if (!password) {
    throw new ApiError(400, "Password is required.");
  }

  const user = await User.findOne({ email });


  if (!user) {
    throw new ApiError(400, "User does not exists.");
  }

  const isPasswordValid = await user.isPasswordCorret(password);

  if (!isPasswordValid) {
    throw new ApiError(404, "Invalid user credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessorRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return {loggedInUser, accessToken };
};

export { createUserService, loginService };
