import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  products,
  selectById,
  updateProduct,
} from "../controllers/product.controller.js";
import { getAllUsers } from "../controllers/users.controller.js";
let productRouter = new Router();

productRouter.get("/products", products);
productRouter.get("/products/:id", selectById);
productRouter.post("/products/", createProduct);
productRouter.put("/products/:id", updateProduct);
productRouter.delete("/products/:id", deleteProduct);

export default productRouter;
