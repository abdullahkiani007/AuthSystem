import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  code: { type: String },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const userModel = mongoose.model("User", userSchema, "user");

export default userModel;
