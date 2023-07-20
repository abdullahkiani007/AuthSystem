import UserDto from "../Dto/userDto.js";
import JWTservice from "../services/JWTauth.js";
import userModel from "../models/userModel.js";

const auth = async (req, res, next) => {
  const { AccessToken, RefreshToken } = req.cookies;

  if (!AccessToken || !RefreshToken) {
    const error = {
      status: 409,
      message: "Unauthorized",
    };
    return next(error);
  }

  let _id;
  try {
    _id = JWTservice.verifyAccessToken(AccessToken).id;
  } catch (error) {
    return next(error);
  }

  let user;
  try {
    user = await userModel.findOne({ _id });

    const userdto = new UserDto(user);

    req.user = userdto;
    next();
  } catch (error) {
    return next(error);
  }
};

export default auth;
