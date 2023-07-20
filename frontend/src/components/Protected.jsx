import React, { Children } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

function Protected() {
  const user = useSelector((state) => state.user);
  console.log(user);
  console.log(Children.count());
  return <div>{user.auth && <Outlet />}</div>;
}

export default Protected;
