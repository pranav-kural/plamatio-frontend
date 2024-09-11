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

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  userId: string;
};

export type Order = {
  id: number;
  userId: string;
  addressId: number;
  totalPrice: number;
  createdAt: string;
  status: string;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
};

export type DetailedOrder = {
  order: Order;
  orderItems: OrderItem[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
  primary: boolean;
};

export type NewUser = {
  firstName: string;
  lastName: string;
  refId: string;
};

export type NewAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
};
