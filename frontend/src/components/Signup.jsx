import React, { useState } from "react";
import TextInput from "./TextInput";
import signupSchema from "../schema/signupSchema";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { signUp } from "../api/internal";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router";

function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, errors, handleBlur, handleChange, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
  });
  const handleSubmit = async () => {
    setLoading(true);
    let response;

    try {
      response = await signUp({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        response = response.data;
        const user = {
          _id: response.user._id,
          name: response.user.name,
          email: response.user.email,
          auth: response.auth,
        };
        dispatch(setUser(user));
        navigate("/verify");
      } else {
        setError(response.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ type: "inertia", velocity: 449 }}
        className="flex flex-col items-center bg-red-700 rounded-3xl w-full mx-3 p-8 md:w-1/2 shadow-customshadow"
      >
        <h1 className="font-bold text-4xl text-white mt-8">SignUp</h1>
        <TextInput
          label={"Name"}
          type="text"
          value={values.name}
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="name"
          error={errors.name || touched.name ? 1 : undefined}
          errormessage={errors.name}
        />
        <TextInput
          label={"Email"}
          type="email"
          value={values.email}
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="email"
          error={errors.email || touched.email ? 1 : undefined}
          errormessage={errors.email}
        />
        <TextInput
          label={"password"}
          type={"password"}
          name={"password"}
          placeholder={"password"}
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.password || touched.password ? 1 : undefined}
          errormessage={errors.password}
        />
        <TextInput
          label={"Confirm password"}
          type={"password"}
          name={"confirmPassword"}
          placeholder={"confirm password"}
          value={values.confirmPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          error={
            errors.confirmPassword || touched.confirmPassword ? 1 : undefined
          }
          errormessage={errors.confirmPassword}
        />

        <motion.button
          className="bg-white rounded-lg w-40 text-red-800 font-bold h-10 mt-8"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={
            errors.name ||
            errors.email ||
            errors.password ||
            errors.confirmPassword
          }
          onClick={handleSubmit}
        >
          SignUp
        </motion.button>
        {error && <p className="text-red-300"> {error}</p>}
      </motion.div>
    </div>
  );
}

export default Signup;
