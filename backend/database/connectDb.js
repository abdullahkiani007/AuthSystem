import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_CONNECTION_STRING}`)
    .then(() => {
      console.log("Data base connected");
    })
    .catch((error) => {
      console.log("Database not connected");
      console.log(error);
    });
};

export default connection;
