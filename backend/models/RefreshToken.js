import mongoose from "mongoose";

const RefreshTokenSchema = mongoose.Schema({
  RefreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const RefreshToken = mongoose.model(
  "RefreshToken",
  RefreshTokenSchema,
  "refreshtoken"
);
export default RefreshToken;
