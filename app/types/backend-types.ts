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
