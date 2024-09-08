import {apiSlice} from './api-slice';
import {
  getPlamatioBackendAPIKey,
  PLAMATIO_BACKEND_ENDPOINTS as PBE,
} from '../plamatio-backend/plamatio-api';
import {
  CategoriesCollection,
  SubCategoriesCollection,
} from '../plamatio-backend/types';
import {Category, SubCategory} from '@/app/types/backend-types';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<Category, number>({
      query: (categoryId) => ({
        url: PBE.CATEGORIES.GET(categoryId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => [{type: 'Category', id: result?.id}],
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getCategories: builder.query<CategoriesCollection, void>({
      query: () => ({
        url: PBE.CATEGORIES.GET_ALL(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => {
        if (result) {
          return [
            'Categories',
            ...result.data.map(({id}) => ({type: 'Category', id}) as const),
          ];
        } else {
          return [];
        }
      },
    }),
    getSubCategory: builder.query<SubCategory, number>({
      query: (subCategoryId) => ({
        url: PBE.CATEGORIES.GET_SUBCATEGORY(subCategoryId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => [{type: 'SubCategory', id: result?.id}],
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getSubCategories: builder.query<SubCategoriesCollection, void>({
      query: () => ({
        url: PBE.CATEGORIES.GET_ALL_SUBCATEGORIES(),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => {
        if (result) {
          return [
            'SubCategories',
            ...result.data.map(({id}) => ({type: 'SubCategory', id}) as const),
          ];
        } else {
          return [];
        }
      },
    }),
    getSubCategoriesByCategory: builder.query<SubCategoriesCollection, number>({
      query: (categoryId) => ({
        url: PBE.CATEGORIES.GET_SUBCATEGORIES_BY_CATEGORY(categoryId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => {
        if (result) {
          return [
            'CategorySubCategories',
            ...result.data.map(({id}) => ({type: 'SubCategory', id}) as const),
          ];
        } else {
          return [];
        }
      },
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetCategoriesQuery,
  useGetSubCategoryQuery,
  useGetSubCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
} = productsApiSlice;
