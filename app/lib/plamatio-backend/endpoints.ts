import type {
  CartItemDeleteParams,
  DeleteAddressParams,
} from '@/app/lib/plamatio-backend/types';

/**
 * Plamatio Backend Endpoints
 */
export const PLAMATIO_BACKEND_ENDPOINTS = {
  PRODUCTS: {
    GET: (id: number) => `/products/get/${id}`,
    GET_ALL: () => '/products/all',
    GET_BY_CATEGORY: (categoryId: number) => `/products/category/${categoryId}`,
    GET_BY_SUBCATEGORY: (subCategoryId: number) =>
      `/products/subcategory/${subCategoryId}`,
    GET_HERO: () => '/products/hero',
    GET_HERO_BY_CATEGORY: (categoryId: number) =>
      `/products/hero/category/${categoryId}`,
    GET_SEARCH: (query: string) => `/products/search/${query}`,
    ADD: () => '/products/add',
    UPDATE: (id: number) => `/products/update/${id}`,
    DELETE: (id: number) => `/products/delete/${id}`,
  },
  CATEGORIES: {
    GET: (id: number) => `/categories/get/${id}`,
    GET_ALL: () => '/categories/all',
    GET_SUBCATEGORY: (id: number) => `/categories/subcategories/get/${id}`,
    GET_SUBCATEGORIES_BY_CATEGORY: (id: number) =>
      `/categories/subcategories/category/${id}`,
    GET_ALL_SUBCATEGORIES: () => '/categories/subcategories/all',
  },
  CART: {
    GET: (id: number) => `/cart/get/${id}`,
    GET_ALL: (userId: string) => `/cart/all/${userId}`,
    ADD: () => '/cart/add',
    ADD_ALL: () => '/cart/add/all',
    UPDATE: () => '/cart/update',
    DELETE: (params: CartItemDeleteParams) =>
      `/cart/delete/${params.cartItemId}/user/${params.userId}`,
  },
  USERS: {
    GET: (id: string) => `/users/get/${id}`,
    GET_ADDRESS: (id: number) => `/users/addresses/get/${id}`,
    GET_ADDRESSES: (userId: string) => `/users/addresses/user/${userId}`,
    ADD_USER: () => '/users/add',
    ADD_ADDRESS: () => '/users/addresses/add',
    UPDATE_USER: () => '/users/update',
    UPDATE_ADDRESS: () => '/users/addresses/update',
    DELETE: (id: string) => `/users/delete/${id}`,
    DELETE_ADDRESS: (params: DeleteAddressParams) =>
      `/users/addresses/delete/${params.addressId}/user/${params.userId}`,
  },
  ORDERS: {
    GET: (id: number) => `/orders/get/${id}`,
    GET_ALL: (userId: string) => `/orders/all/${userId}`,
    GET_ITEMS: (id: number) => `/orders/items/get/${id}`,
    GET_ALL_ITEMS: (orderId: number) => `/orders/items/all/${orderId}`,
    GET_DETAILED: (orderId: number) => `/orders/detailed/get/${orderId}`,
    GET_ALL_DETAILED: (userId: string) => `/orders/detailed/all/${userId}`,
    ADD: () => '/orders/add',
    ADD_DETAILED: () => '/orders/detailed/add',
    ADD_ITEM: () => '/orders/items/add',
    UPDATE: () => '/orders/update',
    UPDATE_ITEM: () => '/orders/items/update',
    DELETE: (id: number) => `/orders/delete/${id}`,
    DELETE_ITEM: (id: number) => `/orders/items/delete/${id}`,
  },
};
