/**
 * Plamatio Backend Endpoints
 */
export const PLAMATIO_BACKEND_ENDPOINTS = {
  PRODUCTS: {
    GET: (id: number) => `/products/get/${id}`,
    GET_ALL: () => '/products/all',
    GET_BY_CATEGORY: (categoryId: number) => `/products/category/${categoryId}`,
    GET_BY_SUBCATEGORY: (subCategoryId: number) => `/products/subcategory/${subCategoryId}`,
    GET_HERO: () => '/products/hero',
    GET_HERO_BY_CATEGORY: (category: string) => `/products/hero/category/${category}`,
    GET_SEARCH: (query: string) => `/products/search/${query}`,
    ADD: () => '/products/add',
    UPDATE: (id: number) => `/products/update/${id}`,
    DELETE: (id: number) => `/products/delete/${id}`,
  },
  CATEGORIES: {
    GET: (id: number) => `/categories/get/${id}`,
    GET_ALL: () => '/categories/all',
    GET_SUBCATEGORY: (id: number) => `/categories/subcategories/get/${id}`,
    GET_SUBCATEGORIES_BY_CATEGORY: (id: number) => `/categories/subcategories/category/${id}`,
    GET_ALL_SUBCATEGORIES: () => '/categories/subcategories/all',
  },
  CART: {
    GET: (id: number) => `/cart/get/${id}`,
    GET_ALL: (userId: number) => `/cart/all/${userId}`,
    ADD: () => '/cart/add',
    UPDATE: () => '/cart/update',
    DELETE: (id: number) => `/cart/delete/${id}`,
  },
  USERS: {
    GET: (id: number) => `/users/get/${id}`,
    GET_BY_REF: (id: number) => `/users/ref/${id}`,
    GET_ADDRESS: (id: number) => `/users/addresses/get/${id}`,
    GET_ADDRESSES: (userId: number) => `/users/addresses/user/${userId}`,
    ADD_USER: () => '/users/add',
    ADD_ADDRESS: () => '/users/addresses/add',
    UPDATE_USER: () => '/users/update',
    UPDATE_ADDRESS: () => '/users/addresses/update',
    DELETE: (id: number) => `/users/delete/${id}`,
    DELETE_ADDRESS: (id: number) => `/users/addresses/delete/${id}`,
  },
};
