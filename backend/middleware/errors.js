import Joi from "joi";

export const errorhandling = (error, req, res, next) => {
  let message = "Internal server error";
  let status = 500;

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

  res.status(status).json({
    status,
    message,
  });
};
