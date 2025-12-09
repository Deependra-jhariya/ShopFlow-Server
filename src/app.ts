import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin:process.env.CORS_ORIGIN,
    Credential: true,
  })
);


app.use(cors());
app.use(express.json());  // REQUIRED for req.body
app.use(express.urlencoded({ extended: true })); // REQUIRED for form data
app.use(cookieParser());

// Routes
import userRoute from "../src/modules/user/user.routes.ts"

app.use("/auth/api/v1",userRoute)

export default app;
