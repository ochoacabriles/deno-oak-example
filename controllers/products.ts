import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { mongoUri } from "../config/environment.ts";
import { MongoClient } from "../deps.ts";
import { Product, ProductToAdd, ProductToUpdate } from "../types/products.ts";

const client = new MongoClient();

try {
  await client.connect("mongodb+srv://coderhouse:coderhouse123@cluster0.xvejx.gcp.mongodb.net/test");
  console.log("Connected to Mongo");
} catch (err) {
  console.error(err);
}

const db = client.database();
const productsCollection = db.collection<Product>("products");

export const listProductsController = async () => {
  const products = await productsCollection.find({}).toArray();
  return products;
};

export const addProductController = async (product: ProductToAdd) => {
  const _id = await productsCollection.insertOne(product)

  return {
    ...product,
    _id,
  };
};

export const findProductController = (productId: string) => productsCollection.findOne({ _id: new ObjectId(productId) });


export const updateProductController = async (productId: string, productToUpdate: ProductToUpdate) => {
  const result = await productsCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $set: productToUpdate }
  );
  
  if (result.modifiedCount === 0) {
    throw new Error("Product not found");
  }

  return {
    ...productToUpdate,
    _id: new ObjectId(productId),
  };
};

export const deleteProductsController = async () => {
  const result = await productsCollection.deleteMany({});
  return result.deletedCount;
};
