export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  previousPrice?: number;
  category: string;
  subCategory: string;
  imageUrl: string;
};
