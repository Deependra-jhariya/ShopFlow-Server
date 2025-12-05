import { User } from "./user.model";
import { asyncHandler } from "../../utils/asyncHandler.ts";
import { ApiResponse } from "../../utils/ApiResponse.ts";
import { createUser } from "./user.services.ts";

export const handleCreateUser = asyncHandler(async (req, res) => {
    
  const result = await createUser(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "User create successfully."));
});
