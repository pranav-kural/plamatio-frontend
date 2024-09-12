export type OrderDetailsProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
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
