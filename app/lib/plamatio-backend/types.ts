import { Category, Product, SubCategory } from "@/app/types/backend-types";


export type ProductsCollection = {
  data: Product[];
}

export type CategoriesCollection = {
  data: Category[];
}

export type SubCategoriesCollection = {
  data: SubCategory[];
}