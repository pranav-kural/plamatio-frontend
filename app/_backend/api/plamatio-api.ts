/**
 * Plamatio Backend API URL
 */
export const getPlamatioBackendAPIURL = () => {
  const url = process.env.PLAMATIO_BACKEND_API_URL;
  if (!url) {
    throw new Error('Plamatio Backend API URL not found');
  }
  return url;
};

/**
 * Plamatio Backend API Key
 */
export const getPlamatioBackendAPIKey = () => {
  const apiKey = process.env.PLAMATIO_BACKEND_API_KEY;
  if (!apiKey) {
    throw new Error('Plamatio Backend API Key not found');
  }
  return apiKey;
};

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
    UPDATE: () => '/cart/update',
    DELETE: (id: number) => `/cart/delete/${id}`,
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
    DELETE_ADDRESS: (id: number) => `/users/addresses/delete/${id}`,
  },
};
