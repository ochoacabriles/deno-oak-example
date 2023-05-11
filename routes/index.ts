import { Router } from "../deps.ts";
import { createProduct, findProduct, listProducts } from "../handlers/products.ts";
import { Router } from "../deps.ts";
import { 
  listProductsController, 
  addProductController, 
  findProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/products.ts";

const router = new Router();

router.get("/products", async (ctx) => {
  const products = await listProductsController();
  ctx.response.body = products;
});

router.post("/products", async (ctx) => {
  const product = ctx.request.body({ type: "json" }).value;
  const newProduct = await addProductController(product);
  ctx.response.status = 201;
  ctx.response.body = newProduct;
});

router.get("/products/:id", async (ctx) => {
  const { id } = ctx.params;
  const product = await findProductController(id);
  if (!product) {
    ctx.response.status = 404;
    return;
  }
  ctx.response.body = product;
});

router.put("/products/:id", async (ctx) => {
  const { id } = ctx.params;
  const product = ctx.request.body({ type: "json" }).value;
  const modifiedCount = await updateProductController(id, product);
  if (modifiedCount === 0) {
    ctx.response.status = 404;
    return;
  }
  ctx.response.status = 204;
});

router.delete("/products/:id", async (ctx) => {
  const { id } = ctx.params;
  const deleted = await deleteProductController(id);
  if (!deleted) {
    ctx.response.status = 404;
    return;
  }
  ctx.response.status = 204;
});

export default router;

  
