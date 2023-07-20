import express from "express";
import { userController } from "./controllers/userController.js";
import auth from "./middleware/auth.js";
const router = express.Router();

const root = router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "connection successfull",
  });
});
const createUser = router.post("/signup", userController.createUser);

const loginUser = router.post("/login", userController.loginUser);

const signOut = router.get("/signout", auth, userController.signOut);

const refresh = router.get("/refresh", userController.refresh);

export const routes = { createUser, loginUser, signOut, refresh, root };
