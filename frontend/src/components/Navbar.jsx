import React from "react";
import { useSelector } from "react-redux";
function Navbar() {
  const auth = useSelector((state) => state.user.auth);
  const background = `${auth ? "bg-purple-800 " : "bg-orange-700"}`;
  return (
    <nav className={`${background} md:h-16 h-12 text-center pt-3`}>
      <h2 className="text-2xl md:text-3xl font-bold text-white ">
        Auth System
      </h2>
    </nav>
  );
}

export default Navbar;
