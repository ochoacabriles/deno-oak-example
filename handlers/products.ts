import { addProductController, findProductController, listProductsController, updateProductController, deleteProductsController } from "../controllers/products.ts";
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

export const updateProduct = async(ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });
  const { name, price } = await ctx.request.body().value;
  const productToUpdate = {name, price}

  const product = await findProductController(productId)
  if (!product) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Product not found" };
    return;
  }

  try {
    await updateProductController(productId, productToUpdate);
    ctx.response.body = { message: "Product updated successfully" };
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.body = { message: "Error updating product" };
    ctx.response.status = 500;
  }

}


export const deleteProducts = async (ctx: Context) => {
  try {
    const deletedCount = await deleteProductsController();
    ctx.response.body = { deletedCount };
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.body = { message: "Error deleting products" };
    ctx.response.status = 500;
  }
};