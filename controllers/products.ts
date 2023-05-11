import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { mongoUri } from "../config/environment.ts";
import { MongoClient } from "../deps.ts";
import { Product, ProductToAdd } from "../types/products.ts";

const client = new MongoClient();

try {
  await client.connect(mongoUri);
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


export const updateProductController = async (productId: string, name: string, price: number) => {
  const result = await productsCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $set: { name: name, price: price } }
  );
  return result;
}
 

export const deleteProductController = async (productId: string) => { 
  const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
  return result; 
}