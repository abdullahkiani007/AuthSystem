import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is requried")
    .email("email address not valid"),
  password: yup.string().min(5).required("password is requried"),
});

export default loginSchema;
