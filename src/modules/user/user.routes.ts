import {Router} from "express"
import { handleCreateUser, handleLoginUser } from "./user.controller.ts";
const router = Router()


router.route("/signup").post(handleCreateUser)
router.route("/login").post(handleLoginUser)

export default router;