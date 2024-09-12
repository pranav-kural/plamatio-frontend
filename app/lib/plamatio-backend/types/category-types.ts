export type Category = {
  id: number;
  name: string;
  description: string;
  offered: boolean;
};

export type SubCategory = {
  id: number;
  name: string;
  description: string;
  category: number;
  offered: boolean;
};

export type CategoriesCollection = {
  data: Category[];
};

export type SubCategoriesCollection = {
  data: SubCategory[];
};
