import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/;

const signupSchema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(8, "Minimum 8 characters are allowed")
    .max(50),
  email: yup
    .string()
    .required("Email is requried")
    .email("email address not valid"),
  password: yup
    .string()
    .min(5)
    .required("password is requried")
    .matches(passwordPattern, "must contain uppercase and digits"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "passwords donot match")
    .required("Confirm password is required"),
});

export default signupSchema;
