import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  products,
  selectById,
  updateProduct,
} from "../controllers/product.controller.js";
import { getAllUsers } from "../controllers/users.controller.js";
import err from "../middlewares/err.middleware.js";
let productRouter = new Router();

productRouter.get("/products", products);
productRouter.get("/products/:id", selectById);
productRouter.post("/products/", createProduct);
productRouter.put("/products/:id", updateProduct);
productRouter.delete("/products/:id", deleteProduct);

productRouter.use(err);

export default productRouter;
