import Joi from "joi";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWTservice from "../services/JWTauth.js";
import UserDto from "../Dto/userDto.js";
import generateRandom from "../services/generateCode.js";
import sendCode from "../services/sendMail.js";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/;

export const userController = {
  async createUser(req, res, next) {
    console.log("Create User");

    const userSchema = Joi.object({
      name: Joi.string().min(8).max(30).required(),
      password: Joi.string().min(8).pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
      email: Joi.string().email().required(),
    });

    const { error } = userSchema.validate(req.body);

    let user;
    let accessToken;
    let refreshToken;

    if (error) {
      console.log("error");
      return next(error);
    } else {
      try {
        const emailInUse = await userModel.exists({ email: req.body.email });
        const nameInUse = await userModel.exists({ name: req.body.name });

        if (emailInUse) {
          const error = {
            status: 409,
            message: "Email already Exists",
          };
          return next(error);
        }
        if (nameInUse) {
          const error = {
            status: 409,
            message: "username already Exists",
          };
          return next(error);
        }
        const { name, password, email } = req.body;
        const code = generateRandom();
        console.log(code);
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
          user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            code,
          });
          accessToken = JWTservice.signAccessToken({ id: user._id });
          refreshToken = JWTservice.signRefreshToken({ id: user._id });
          JWTservice.storeRefreshToken(refreshToken, user._id);

          const emailResponse = await sendCode(user.email, user.code);
          if (emailResponse.status !== 200) {
            return next(emailResponse);
          }
          console.log("email response", emailResponse);
        } catch (error) {
          return next(error);
        }
        res.cookie("AccessToken", accessToken, {
          maxAge: 300000,
          httpOnly: true,
          secure: true,
        });

        res.cookie("RefreshToken", refreshToken, {
          maxAge: 900000,
          httpOnly: true,
          secure: true,
        });
      } catch (error) {
        return next(error);
      }
    }

    const newUser = new UserDto(user);
    console.log(newUser);

    res.status(200).json({
      user: newUser,
      auth: false,
    });
  },

  async loginUser(req, res, next) {
    console.log("Login user");
    const { email, password } = req.body;

    const userLoginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = userLoginSchema.validate({ email, password });

    if (error) {
      return next(error);
    }

    let user;
    let accessToken;
    let refreshToken;
    try {
      user = await userModel.findOne({ email });

      if (user) {
        console.log(user);
        const comparePass = await bcrypt.compare(password, user.password);

        if (comparePass) {
          if (!user.verified) {
            const newUser = new UserDto(user);
            const error = {
              status: 200,
              user: newUser,
              auth: false,
            };
            return next(error);
          }
          accessToken = JWTservice.signAccessToken({ id: user._id });
          refreshToken = JWTservice.signRefreshToken({ id: user._id });
          JWTservice.storeRefreshToken(refreshToken, user._id);
        } else {
          const error = {
            status: 409,
            message: "Invalid Password",
          };
          return next(error);
        }
      } else {
        const error = {
          status: 409,
          message: "Email doesnot exists",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    res.cookie("AccessToken", accessToken, {
      maxAge: 300000,
      httpOnly: true,
      secure: true,
    });

    res.cookie("RefreshToken", refreshToken, {
      maxAge: 900000,
      httpOnly: true,
      secure: true,
    });

    const newUser = new UserDto(user);
    res.status(200).json({
      user: newUser,
      auth: true,
    });
  },

  async signOut(req, res, next) {
    JWTservice.deleteRefreshToken(req.cookies.RefreshToken);
    res.clearCookie("AccessToken");
    res.clearCookie("RefreshToken");

    res.status(200).json({
      message: "Logged out Successfully",
      user: null,
      auth: false,
    });
  },

  // verify code
  async verify(req, res, next) {
    const codeSchema = Joi.object({
      email: Joi.string().required(),
      code: Joi.string()
        .min(4)
        .max(4)
        .pattern(/^[1-9]{4}$/),
    });

    const { error } = codeSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { email, code } = req.body;
    console.log(email, code);
    let user;
    try {
      user = await userModel.findOne({ email });
      if (code !== user.code) {
        const error = {
          status: 409,
          message: "Invalid Code",
        };
        return next(error);
      }

      await userModel.updateOne(
        { email },
        {
          verified: true,
        }
      );
    } catch (error) {
      return next(error);
    }
    const newUser = new UserDto(user);

    res.status(200).json({
      user: newUser,
      auth: true,
    });
  },

  async refresh(req, res, next) {
    const originalRefreshToken = req.cookies.RefreshToken;
    let accessToken;
    let refreshToken;

    let _id;
    let user;
    try {
      _id = JWTservice.verifyRefreshToken(originalRefreshToken).id;

      if (_id) {
        accessToken = JWTservice.signAccessToken({
          _id,
        });

        refreshToken = JWTservice.signRefreshToken({
          _id,
        });

        JWTservice.updateRefreshToken(refreshToken, _id);

        res.cookie("AccessToken", accessToken, {
          maxAge: 300000,
          httpOnly: true,
          secure: true,
        });

        res.cookie("RefreshToken", refreshToken, {
          maxAge: 900000,
          httpOnly: true,
          secure: true,
        });

        user = await userModel.findOne({ _id });
      }
    } catch (error) {
      return next(error);
    }

    const userdto = new UserDto(user);

    res.status(200).json({
      user: userdto,
      auth: true,
    });
  },
};
