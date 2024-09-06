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
  categoryId: number;
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
  userId: number;
};

export type NewCartItem = {
  productId: number;
  quantity: number;
  userId: number;
};

export type Order = {
  id: number;
  userId: number;
  addressId: number;
  totalPrice: number;
  createdAt: string;
  status: string;
};

export type NewOrder = {
  userId: number;
  addressId: number;
  totalPrice: number;
  status: string;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
};

export type NewOrderItem = {
  orderId: number;
  productId: number;
  quantity: number;
};

export type DetailedOrder = {
  order: Order;
  orderItems: OrderItem[];
};

export type User = {
  id: number;
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
  userId: number;
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
  userId: number;
};
