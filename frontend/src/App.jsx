import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "./store/userSlice";
import { signOut } from "./api/internal";

function App() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.user.auth);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  console.log("active", active);

  const handleSignout = async () => {
    dispatch(resetUser());
    try {
      let response;

      response = await signOut();

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />

      <div className=" flex flex-row justify-center mb-5">
        {auth === true ? (
          <motion.button
            className={`bg-purple-800  text-white rounded-3xl w-40 m-5 h-16 text-lg `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            layoutId="underline"
            onClick={() => {
              setActive("");
              handleSignout();
            }}
          >
            SignOut
          </motion.button>
        ) : (
          <>
            <motion.button
              className={`bg-green-800 text-white rounded-3xl w-40 m-5 h-16 text-lg ${
                active == "login" ? "font-bold text-xl" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              layoutId="underline"
              onClick={() => {
                navigate("/login");
                setActive("login");
              }}
            >
              Login
            </motion.button>
            <motion.button
              className={`bg-red-800 text-white rounded-3xl w-40 m-5 h-16 text-lg ${
                active == "signup" ? "font-bold text-xl" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigate("/signup");
                setActive("signup");
              }}
            >
              SignUp
            </motion.button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
