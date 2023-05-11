import { addProductController, findProductController, listProductsController, updateProductController, deleteProductController } from "../controllers/products.ts";
import { Context, helpers } from "../deps.ts";

export const findProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });
  const product = await findProductController(productId);

  if (!product) {
    ctx.response.status = 404;
    return;
  }

  ctx.response.body = product;
};

export const listProducts = async (ctx: Context) => {
  ctx.response.body = await listProductsController();
};

export const createProduct = async (ctx: Context) => {
  const { name, price } = await ctx.request.body().value;
  const product = await addProductController({ name, price });
  ctx.response.body = product;
  ctx.response.status = 201;
};

export const updateProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });
  const { name, price } = await ctx.request.body().value;

  const product = await updateProductController(productId, { name, price });

  if (!product) {
    ctx.response.status = 404;
    return;
  }

  ctx.response.body = product;
};

export const deleteProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });

  const deletedProduct = await deleteProductController(productId);

  if (!deletedProduct) {
    ctx.response.status = 404;
    return;
  }

  ctx.response.body = deletedProduct;
};