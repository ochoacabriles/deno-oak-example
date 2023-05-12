import { Router } from "../deps.ts";
import { createProduct, findProduct, listProducts, updateProduct, deleteProduct} from "../handlers/products.ts";

export const productRouter = new Router()
  .get('/api/products/:productId', findProduct)
  .delete('/api/products/:productId', deleteProduct)
  .put('/api/products/:productId', updateProduct)
  .get('/api/products', listProducts)
  .post('/api/products', createProduct);