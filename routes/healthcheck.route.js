import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller.js";
import err from "../middlewares/err.middleware.js";

const healthRouter = new Router();

healthRouter.get("/health", healthCheck);

healthRouter.use(err);

export default healthRouter;
