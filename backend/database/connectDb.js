import mongoose from "mongoose";

const connection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://abdullahkiani931:abdullah-auth123@authsystem.oiincud.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Data base connected");
    })
    .catch((error) => {
      console.log("Database not connected");
      console.log(error);
    });
};

export default connection;
