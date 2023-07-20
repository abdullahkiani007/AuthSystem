import Joi from "joi";

export const errorhandling = (error, req, res, next) => {
  let message = "Internal server error";
  let status = 500;
  let response = [message, status];

  if (error instanceof Joi.ValidationError) {
    message = error.message;
    status = 409;
  }
  if (error.message) {
    message = error.message;
  }
  if (error.status) {
    status = error.status;
  }

  console.log("error handler");
  if (error.status === 200) {
    res.status(status).json({
      user: error.user,
      auth: error.auth,
    });
  } else {
    res.status(status).json({
      status,
      message,
    });
  }
};
