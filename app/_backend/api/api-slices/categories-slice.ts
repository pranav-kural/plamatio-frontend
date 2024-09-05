import {Category, SubCategory} from '@/app/types/backend-types';
import {apiSlice} from './api-slice';
import {
  getPlamatioBackendAPIKey,
  PLAMATIO_BACKEND_ENDPOINTS as PBE,
} from '../plamatio-api';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: PBE.CATEGORIES.GET_ALL(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['Categories'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getSubCategories: builder.query<SubCategory[], void>({
      query: () => ({
        url: PBE.CATEGORIES.GET_ALL_SUBCATEGORIES(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['SubCategories'],
    }),
    getSubCategoriesByCategory: builder.query<SubCategory[], number>({
      query: (categoryId) => ({
        url: PBE.CATEGORIES.GET_SUBCATEGORIES_BY_CATEGORY(categoryId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['SubCategories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
} = productsApiSlice;
