export type Category = {
  id: number;
  name: string;
  description: string;
};

export type SubCategory = {
  id: number;
  name: string;
  description: string;
  heroProduct: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  previousPrice?: number;
  category: number;
  subCategory: number;
  imageUrl: string;
  offered: boolean;
};

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

export type Cart = {
  id: number;
  items: CartItem[];
  total: number;
};

export type NewCartItem = {
  productId: number;
  quantity: number;
};

export type NewCart = {
  items: NewCartItem[];
};

export type Order = {
  id: number;
  items: CartItem[];
  date: string;
  total: number;
};
