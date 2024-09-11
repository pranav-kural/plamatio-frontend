import {
  Address,
  CartItem,
  Category,
  Order,
  Product,
  SubCategory,
} from '@/app/types/backend-types';

export type ProductsCollection = {
  data: Product[];
};

export type CategoriesCollection = {
  data: Category[];
};

export type SubCategoriesCollection = {
  data: SubCategory[];
};

export type CartItemsCollection = {
  data: CartItem[];
};

export type CartItemAPIStruct = {
  id: number;
  product_id: number;
  quantity: number;
  user_id: string;
};

export type NewCartItem = {
  product_id: number;
  quantity: number;
  user_id: string;
};

export type NewCartItemsCollection = {
  data: NewCartItem[];
};

export type CartItemDeleteParams = {
  cartItemId: number;
  userId: string;
};

export type AddressesCollection = {
  data: Address[];
};

export type DeleteAddressRequestParams = {
  addressId: number;
  userId: string;
};

export type OrdersCollection = {
  data: Order[];
};

export type DetailedOrderAPIResponse = {
  order: {
    id: number;
    user_id: string;
    address_id: number;
    total_price: number;
    created_at: string;
    status: string;
  };
  items: {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
  }[];
};

export type DetailedOrdersCollection = {
  data: DetailedOrderAPIResponse[];
};

export type NewOrder = {
  user_id: string;
  address_id: number;
  total_price: number;
  status: string;
};

export type NewDetailedOrderItem = {
  product_id: number;
  quantity: number;
};

export type NewDetailedOrder = {
  order: NewOrder;
  items: NewDetailedOrderItem[];
};
