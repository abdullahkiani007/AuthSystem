import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CodeInput from "./CodeInput";
import { motion } from "framer-motion";
import { array } from "yup";
import { verify } from "../api/internal";
import { useNavigate } from "react-router";
import { setUser } from "../store/userSlice";

function VerifyEmail() {
  const email = useSelector((state) => state.user.email);

  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let codeInput = [];
  useEffect(() => {
    if (email === "") {
      navigate("/signup");
    }
  }, []);

  const handleChange = (index, event) => {
    isDisabled();
    const newCode = [...code];

    let num = parseInt(event.target.value);
    console.log(num);
    if (isNaN(num)) {
      newCode[index] = "";
      setCode(newCode);
    } else {
      newCode[index] = num;
      setCode(newCode);
    }
  };
  for (let i = 0; i < 4; i++) {
    codeInput.push(
      <input
        key={i}
        index={i}
        className="w-10 m-2 rounded-sm h-10 text-center font-bold "
        type="text"
        pattern="[1-9]"
        maxLength="1"
        value={code[i]}
        onChange={(event) => handleChange(i, event)}
      />
    );
  }

  function isDisabled() {
    let disable = false;

    code.forEach((value) => {
      if (!value) {
        disable = true;
        return;
      }
    });
    setDisabled(disable);
  }

  const handleSubmit = async () => {
    let response;
    const data = {
      email,
      code: code.join(""),
    };
    try {
      response = await verify(data);
      if (response.status === 200) {
        response = response.data;
        const user = {
          _id: response.user._id,
          name: response.user.name,
          email: response.user.email,
          auth: response.auth,
        };
        dispatch(setUser(user));
        navigate("/home");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="   bg-sky-500 flex flex-col items-center justify-around h-auto w-full mx-3 mt-4 p-8 rounded-3xl md:w-1/2 shadow-customshadow">
        <h1 className="text-xl font-bold text-white mb-6">
          Confirm Your Email
        </h1>
        <p className="text-white text-center">
          Enter confirmation code sent to{" "}
          <span className="text-red-600">{email}</span>
        </p>
        <div className="flex space-between">{codeInput}</div>
        <motion.button
          className="bg-white rounded-lg w-40 text-sky-600 font-bold h-10 mt-8 disabled:text-green-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={disabled}
          onHoverStart={isDisabled}
          onClick={handleSubmit}
        >
          Submit
        </motion.button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default VerifyEmail;
