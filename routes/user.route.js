import { Router } from "express";
import {
  getAllUsers,
  login,
  registerUser,
} from "../controllers/users.controller.js";

let userRouter = new Router();

userRouter.get("/getUsers", getAllUsers);
userRouter.post("/register", registerUser);
userRouter.get("/login", login);

export default userRouter;
