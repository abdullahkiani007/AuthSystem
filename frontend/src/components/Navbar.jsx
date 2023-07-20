import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({ location }) {
  const auth = useSelector((state) => state.user.auth);
  const navigate = useNavigate();

  const background = `${
    auth
      ? "bg-purple-800 "
      : location === "verify"
      ? " bg-sky-500"
      : "bg-orange-700"
  }`;
  return (
    <nav className={`${background} md:h-16 h-12 text-center pt-3`}>
      <Link to={"/"}>
        <h2 className="text-2xl md:text-3xl font-bold text-white ">
          Auth System
        </h2>
      </Link>
    </nav>
  );
}

export default Navbar;
