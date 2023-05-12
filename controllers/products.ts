import { ObjectId } from "https://deno.land/x/mongo/mod.ts";
import { mongoUri } from "../config/environment.ts";
import { MongoClient } from "../deps.ts";
import { Product, ProductToAdd, ProductToUpdate } from "../types/products.ts";

const client = new MongoClient();



try {
  await client.connect(mongoUri);
  console.log("Connected to Mongo");
} catch (err) {
  console.error(err);
}

const db = client.database();
const productsCollection = db.collection<Product>("products");

export const listProductsController = async (): Promise<Product> => {
  const products = await productsCollection.find({}).toArray();
  return products;
};

export const addProductController = async (product: ProductToAdd): Promise<Product> => {
  const _id = await productsCollection.insertOne(product)

  return {
    ...product,
    _id,
  };
};

export const findProductController = async (productId: string): Promise<Product | null> => {
  const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
  return product;
}

export const updateProductController = async(productId: string, name: string, price: number) => {
  const result = await productsCollection.updateOne({ _id: new ObjectId(productId) }, { $set: {name: name, price: price }});
  return result;
};

export const deleteProductController = async (productId: string): Promise<boolean> => {
  const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
  return result;
};