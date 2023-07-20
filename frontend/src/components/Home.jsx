import React from "react";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      className="flex justify-center"
      animate={{ rotate: 180 }}
      transition={{ type: "inertia", velocity: 449 }}
    >
      <div className="bg-purple-800  flex flex-col items-center justify-around h-auto w-full mx-3 p-8 rounded-3xl md:w-1/2 shadow-customshadow">
        <h1 className="text-2xl font-bold text-white">Home</h1>
        <h2 className="text-white text-lg">You are logged in Successfully </h2>
      </div>
    </motion.div>
  );
}

export default Home;
