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

export const listProductsController = async (): Promise<Product[]> => {
  const products = await productsCollection.find({}).toArray();
  return products;
};

export const addProductController = async (product: ProductToAdd): Promise<Product> => {
  const { $oid: id } = await productsCollection.insertOne(product);
  return {
    ...product,
    _id: id,
  };
};

export const findProductController = async (productId: string): Promise<Product | null> => {
  const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
  return product;
};

export const updateProductController = async (productId: string, product: ProductToUpdate): Promise<Product | null> => {
  const { matchedCount, modifiedCount } = await productsCollection.updateOne({ _id: new ObjectId(productId) }, { $set: product });
  if (matchedCount === 0) {
    return null;
  }
  const updatedProduct = await findProductController(productId);
  return updatedProduct;
};

export const deleteProductController = async (productId: string): Promise<boolean> => {
  const { deletedCount } = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
  return deletedCount === 1;
};
