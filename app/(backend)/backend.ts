// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Cart, NewCart, Product} from '../types/backend-types';

const API_URL = 'http://localhost:3000';
const API_VERSION = 'v1';
const API_KEY = '';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  tagTypes: [
    'Product',
    'Products',
    'HeroProducts',
    'Categories',
    'SubCategories',
    'Cart',
    'Order',
  ],
  endpoints: (builder) => ({
    getProduct: builder.query<Product, string>({
      query: (productId) => ({
        url: `${API_VERSION}/products/get/${productId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      providesTags: ['Product'],
    }),
    getProductsByCategory: builder.query<Product[], number>({
      query: (categoryId) => ({
        url: `${API_VERSION}/products/get?categoryId=${categoryId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      providesTags: ['Products'],
    }),
    getProductsBySubCategory: builder.query<Product[], number>({
      query: (subCategoryId) => ({
        url: `${API_VERSION}/products/get?subCategoryId=${subCategoryId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      providesTags: ['Products'],
    }),
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: `${API_VERSION}/products/all`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      providesTags: ['Products'],
    }),
    getHeroProducts: builder.query<Product[], void>({
      query: () => ({
        url: `${API_VERSION}/products/hero`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      providesTags: ['HeroProducts'],
    }),
    getHeroProductsByCategory: builder.query<Product[], number>({
      query: (categoryId) => ({
        url: `${API_VERSION}/products/hero?categoryId=${categoryId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      providesTags: ['HeroProducts'],
    }),
    getCategories: builder.query<Product[], void>({
      query: () => ({
        url: '/categories/all',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      providesTags: ['Categories'],
    }),
    getSubCategories: builder.query<Product[], void>({
      query: () => ({
        url: '/subcategories/all',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      providesTags: ['SubCategories'],
    }),
    getSubCategoriesByCategory: builder.query<Product[], number>({
      query: (categoryId) => ({
        url: `${API_VERSION}/subcategories/get?categoryId=${categoryId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      providesTags: ['SubCategories'],
    }),
    getCart: builder.query<Cart, string>({
      query: (userId: string) => ({
        url: `${API_VERSION}/cart/get?userId=${userId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      providesTags: ['Cart'],
    }),
    addNewCart: builder.mutation<Cart, NewCart>({
      query: (initialCart) => ({
        url: '/cart/add',
        method: 'POST',
        body: initialCart,
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCart: builder.mutation<Cart, Cart>({
      query: (updatedCart) => ({
        url: '/cart/update',
        method: 'PUT',
        body: updatedCart,
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeCart: builder.mutation<void, string>({
      query: (userId) => ({
        url: '/cart/remove',
        method: 'DELETE',
        body: {userId},
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useGetProductsBySubCategoryQuery,
  useGetProductsQuery,
  useGetHeroProductsQuery,
  useGetHeroProductsByCategoryQuery,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
  useGetCartQuery,
  useAddNewCartMutation,
  useUpdateCartMutation,
  useRemoveCartMutation,
} = apiSlice;
