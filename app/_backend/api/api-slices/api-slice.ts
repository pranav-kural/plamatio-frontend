// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getPlamatioBackendAPIURL} from '../plamatio-api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: getPlamatioBackendAPIURL()}),
  tagTypes: [
    'Product',
    'Products',
    'CategoryProducts',
    'SubCategoryProducts',
    'HeroProducts',
    'CategoryHeroProducts',
    'Category',
    'Categories',
    'SubCategory',
    'SubCategories',
    'CategorySubCategories',
    'CartItem',
    'CartItems',
    'Order',
    'Orders',
    'OrderItem',
    'OrderItems',
    'User',
    'Users',
    'Address',
    'Addresses',
  ],
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    healthCheck: builder.query<void, void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
  }),
});
