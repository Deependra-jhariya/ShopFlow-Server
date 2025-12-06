import {Router} from "express"
import { createUser } from "./user.services.ts";
const router = Router()


router.route("/signup").post(createUser)

export default router;