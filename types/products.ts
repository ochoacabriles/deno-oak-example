export type ProductToAdd = {
  name: string;
  price: number;
}

export type Product = ProductToAdd & {
  _id: { $oid: string },
};

export type resp = {
  
}