import mongoose from "mongoose";
import { DB_Name } from "../constant/index.ts";

export const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_Name}`
    );
    console.log(
      `MongoDb connected !! connection Host ${connectionInstance.connection.host}`
    );
  } catch (error: any) {
    console.log("Mongo connection error", error);
    process.exit(1);
  }
};
