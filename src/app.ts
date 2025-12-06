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

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRoute from "../src/modules/user/user.routes.ts"

app.use("/auth/api/v1",userRoute)

export default app;
