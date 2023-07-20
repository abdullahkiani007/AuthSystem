import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import RefreshToken from "../models/RefreshToken.js";

dotenv.config();

class JWTauth {
  static signRefreshToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "60m",
    });
  }
  static signAccessToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });
  }
  static verifyAccessToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
  }
  static verifyRefreshToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
  }

  static async storeRefreshToken(token, userId) {
    try {
      await RefreshToken.create({
        RefreshToken: token,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateRefreshToken(token, _id) {
    try {
      await RefreshToken.updateOne(
        { userId: _id },
        { RefreshToken: token },
        {
          upsert: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteRefreshToken(token) {
    try {
      await RefreshToken.deleteOne({ RefreshToken: token });
    } catch (error) {
      console.log(error);
    }
  }
}

export default JWTauth;
