import express from "express";
import env from "dotenv";

env.config();

import router from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

let app = express();

app.use(express.json());

app.use("/api/v1/users", router);
app.use("/api/v1", productRouter);

export default app;
