import {Product} from '@/app/types/backend-types';
import {apiSlice} from './api-slice';
import {
  getPlamatioBackendAPIKey,
  PLAMATIO_BACKEND_ENDPOINTS as PBE,
} from '../../plamatio-backend/plamatio-api';
import { ProductsCollection } from '../../plamatio-backend/types';

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
      providesTags: (result) => [{type: 'Product', id: result?.id}],
    }),
    getProductsByCategory: builder.query<Product[], number>({
      query: (categoryId) => ({
        url: PBE.PRODUCTS.GET_BY_CATEGORY(categoryId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result = []) => [
        'CategoryProducts',
        ...result.map(({id}) => ({type: 'Product', id}) as const),
      ],
    }),
    getProductsBySubCategory: builder.query<ProductsCollection, number>({
      query: (subCategoryId) => ({
        url: PBE.PRODUCTS.GET_BY_SUBCATEGORY(subCategoryId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => {
        if (result) {
          return [
            'SubCategoryProducts',
            ...result.data.map(({id}) => ({type: 'Product', id}) as const),
          ];
        } else {
          return [];
        }
      },
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
      providesTags: (result = []) => [
        'Products',
        ...result.map(({id}) => ({type: 'Product', id}) as const),
      ],
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getHeroProducts: builder.query<ProductsCollection, void>({
      query: () => ({
        url: PBE.PRODUCTS.GET_HERO(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => {
        if (result) {
          // if we have data, we want to invalidate all hero products
          if (result.data) {
            return [
              'HeroProducts',
              ...result.data.map(({id}) => ({type: 'Product', id}) as const),
            ];
          } else {
            return ['HeroProducts'];
          }
          
        } else {
          // if we don't have data, no tags to invalidate
          return [];
        }
      },
    }),
    getHeroProductsByCategory: builder.query<ProductsCollection, number>({
      query: (categoryId) => ({
        url: PBE.PRODUCTS.GET_HERO_BY_CATEGORY(categoryId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => {
        if (result) {
          // if we have data, we want to invalidate all hero products
          if (result.data) {
            return [
              'CategoryHeroProducts',
              ...result.data.map(({id}) => ({type: 'Product', id}) as const),
            ];
          } else {
            return ['CategoryHeroProducts'];
          }
          
        } else {
          // if we don't have data, no tags to invalidate
          return [];
      }
    }
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
