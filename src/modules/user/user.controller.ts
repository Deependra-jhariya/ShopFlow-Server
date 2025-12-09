import { asyncHandler } from "../../utils/asyncHandler.ts";
import { ApiResponse } from "../../utils/ApiResponse.ts";
import { createUserService,loginService } from "./user.services.ts";

const handleCreateUser = asyncHandler(async (req:any, res:any) => {
    
  const result = await createUserService(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "User created successfully."));
});

const handleLoginUser = asyncHandler(async(req:any,res:any)=>{

  const {loggedInUser,accessToken} = await loginService(req.body)

  return res.status(200).json(new ApiResponse(200,{loggedInUser,accessToken},"User login successfully."))
})


export {handleCreateUser,handleLoginUser}
