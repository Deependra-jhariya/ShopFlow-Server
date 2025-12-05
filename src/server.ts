import "dotenv/config";
import app from "./app.ts";
import { connectDb } from "./config/db.ts";

connectDb()
const onServer = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("server connection failed", error);
  }
};

onServer();
