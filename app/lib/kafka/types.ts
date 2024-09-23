/**
 * Schema for NewUserEventsMessage
 */
export type NewUserEventsMessage = {
  event_type: string;
  core_component: string;
  description: string;
  metadata: object;
};

/**
 * Schema for UserEventsMessage
 */
export type UserEventsMessage = {
  ref_id: string;
  client_id: string;
  event_type: string;
  core_component: string;
  description: string;
  metadata: object;
  timestamp: string;
};

/**
 * Schema for CartUpdatesMessage
 */
export type CartUpdatesMessage = {
  event_type: string;
  cart_item: {
    id: number;
    product_id: number;
    quantity: number;
    user_id: number;
  };
};

/**
 * Schema for OrdersUpdatesMessage
 */
export type OrdersUpdatesMessage = {
  event_type: string;
  order: {
    id: number;
    user_id: number;
    address_id: number;
    total_price: number;
    created_at: string;
    status: string;
  };
  order_items: {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
  }[];
};

/**
 * Schema for UsersUpdatesMessage
 */
export type UsersUpdatesMessage = {
  event_type: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    ref_id: string;
  };
  addresses: {
    id: number;
    street: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    user_id: number;
  }[];
};
