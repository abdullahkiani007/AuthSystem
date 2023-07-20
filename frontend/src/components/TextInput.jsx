import React from "react";
import { motion } from "framer-motion";

function TextInput(props) {
  return (
    <label className="mt-2  text-white text-lg">
      {props.label} <br />
      <motion.input
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        type={props.type}
        id={props.name}
        {...props}
        className="border-4   rounded-lg text-black pl-4 w-80 outline-none"
      />
      {props.error && (
        <p className="text-red-300 font-bold text-sm">{props.errormessage}</p>
      )}
    </label>
  );
}

export default TextInput;
