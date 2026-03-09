import express from "express";
import env from "dotenv";
import { connectDb } from "./configs/db.js";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";

env.config();
connectDb();
let app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", router);

export default app;
