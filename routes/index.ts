import { Router } from "../deps.ts";
import {
  createProduct,
  deleteProducts,
  findProduct,
  listProducts,
  updateProduct,
} from "../handlers/products.ts";

export const productRouter = new Router()
  .get("/api/products/:productId", findProduct)
  .get("/api/products", listProducts)
  .post("/api/products", createProduct)
  .put("/api/products/:productId", updateProduct)
  .delete("/api/products", deleteProducts);
