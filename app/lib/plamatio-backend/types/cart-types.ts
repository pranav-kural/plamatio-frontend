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

export type CartItem = {
  id: number;
  product_id: number;
  quantity: number;
  user_id: string;
};
