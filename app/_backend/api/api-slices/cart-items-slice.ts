import {CartItem, NewCartItem} from '@/app/types/backend-types';
import {apiSlice} from './api-slice';
import {
  getPlamatioBackendAPIKey,
  PLAMATIO_BACKEND_ENDPOINTS as PBE,
} from '../plamatio-api';

export const cartItemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<CartItem[], string>({
      query: (userId: string) => ({
        url: PBE.CART.GET_ALL(userId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['CartItems'],
    }),
    getCartItem: builder.query<CartItem, number>({
      query: (cartItemId) => ({
        url: PBE.CART.GET(cartItemId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['CartItem'],
    }),
    addCartItem: builder.mutation<CartItem, NewCartItem>({
      query: (newCartItem) => ({
        url: PBE.CART.ADD(),
        method: 'POST',
        body: newCartItem,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: ['CartItem'],
    }),
    updateCartItem: builder.mutation<CartItem, CartItem>({
      query: (updatedCart) => ({
        url: PBE.CART.UPDATE(),
        method: 'PUT',
        body: updatedCart,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: ['CartItem'],
    }),
    deleteCartItem: builder.mutation<CartItem, number>({
      query: (cartItemId) => ({
        url: PBE.CART.DELETE(cartItemId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: ['CartItem'],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useGetCartItemQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartItemsApiSlice;
