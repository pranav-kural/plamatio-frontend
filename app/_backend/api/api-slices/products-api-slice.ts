import {Product} from '@/app/types/backend-types';
import {apiSlice} from './api-slice';
import {
  getPlamatioBackendAPIKey,
  PLAMATIO_BACKEND_ENDPOINTS as PBE,
} from '../plamatio-api';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<Product, number>({
      query: (productId) => ({
        url: PBE.PRODUCTS.GET(productId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['Product'],
    }),
    getProductsByCategory: builder.query<Product[], number>({
      query: (categoryId) => ({
        url: PBE.PRODUCTS.GET_BY_CATEGORY(categoryId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['Products'],
    }),
    getProductsBySubCategory: builder.query<Product[], number>({
      query: (subCategoryId) => ({
        url: PBE.PRODUCTS.GET_BY_SUBCATEGORY(subCategoryId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['Products'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PBE.PRODUCTS.GET_ALL(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['Products'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getHeroProducts: builder.query<Product[], void>({
      query: () => ({
        url: PBE.PRODUCTS.GET_HERO(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['HeroProducts'],
    }),
    getHeroProductsByCategory: builder.query<Product[], number>({
      query: (categoryId) => ({
        url: PBE.PRODUCTS.GET_HERO_BY_CATEGORY(categoryId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['HeroProducts'],
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
} = productsApiSlice;
