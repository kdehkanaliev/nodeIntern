import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateStatus,
} from "../controllers/order.controller.js";
import err from "../middlewares/err.middleware.js";

let orderRouter = new Router();

orderRouter.get("/orders", getAllOrders);
orderRouter.post("/orders", createOrder);
orderRouter.get("/orders/:id", getOrderById);
orderRouter.patch("/orders/:id/status", updateStatus);

orderRouter.use(err);

export default orderRouter;
