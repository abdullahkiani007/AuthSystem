import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import loginSchema from "../schema/loginSchema";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { login } from "../api/internal";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router";

function Login() {
  const [error, setError] = useState("");
  // const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  const handleLogin = async () => {
    setLoading(true);
    let response;
    console.log(import.meta.env.VITE_BASE_URL);
    try {
      response = await login({
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
        console.log(response);
        navigate("/home");
      } else {
        setError(response.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex justify-center">
      <motion.div
        animate={{ rotate: 180 }}
        transition={{ type: "inertia", velocity: 449 }}
        className="bg-green-700  flex flex-col items-center justify-around h-auto w-full mx-3 p-8 rounded-3xl md:w-1/2 shadow-customshadow "
      >
        <h1 className="mt-8 font-bold text-white text-4xl">Login</h1>

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
        {error && <p className="text-red-300 mt-2">{error}</p>}
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

        <motion.button
          className="bg-white rounded-lg w-40 text-green-800 font-bold h-10 mt-8 disabled:text-green-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={errors.email || errors.password}
          onClick={handleLogin}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Login;
