export type Product = {
  id: number;
  name: string;
  description: string;
  category: number;
  subCategory: number;
  imageUrl: string;
  price: number;
  previousPrice?: number;
  offered: boolean;
};

export type CategoryHeroProduct = {
  categoryId: number;
  subCategoryId: number;
  productId: number;
};

export type ProductsCollection = {
  data: Product[];
};
