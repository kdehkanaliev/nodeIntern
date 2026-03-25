import { Router } from "express";
import {
  getAllUsers,
  login,
  registerUser,
} from "../controllers/users.controller.js";

import err from "../middlewares/err.middleware.js";

let userRouter = new Router();

userRouter.get("/getUsers", getAllUsers);
userRouter.post("/register", registerUser);
userRouter.get("/login", login);

userRouter.use(err);

export default userRouter;
