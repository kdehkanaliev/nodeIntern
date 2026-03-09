import { Router } from "express";
import {
  register,
  getUsers,
  login,
  getMe,
  refresh,
  logOut,
} from "../controllers/users.controller.js";
import handler from "../middlewares/error.middleware.js";
import auth from "../middlewares/auth.middleware.js";

let router = new Router();

router.get("/", getUsers);
router.get("/refresh", refresh);
router.get("/logout", logOut);
router.get("/getme", auth, handler, getMe);
router.post("/register", handler, register);
router.post("/login", handler, login);

router.use(handler);

export default router;
