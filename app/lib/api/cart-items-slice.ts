import {CartItem} from '@/app/types/backend-types';
import {apiSlice} from './api-slice';
import {
  getPlamatioBackendAPIKey,
  PLAMATIO_BACKEND_ENDPOINTS as PBE,
} from '../plamatio-backend/plamatio-api';
import {
  CartItemsCollection,
  NewCartItem,
  NewCartItemsCollection,
} from '../plamatio-backend/types';

export const cartItemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<CartItemsCollection, string>({
      query: (userId: string) => ({
        url: PBE.CART.GET_ALL(userId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => {
        if (result) {
          return [
            'CartItems',
            ...result.data.map(({id}) => ({type: 'CartItem', id}) as const),
          ];
        } else {
          return [];
        }
      },
    }),
    getCartItem: builder.query<CartItem, number>({
      query: (cartItemId) => ({
        url: PBE.CART.GET(cartItemId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => [{type: 'CartItem', id: result?.id}],
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
      invalidatesTags: (result) => {
        return result ? [{type: 'CartItem', id: result.id}] : ['CartItems'];
      },
    }),
    addCartItems: builder.mutation<CartItemsCollection, NewCartItemsCollection>(
      {
        query: (newCartItems) => ({
          url: PBE.CART.ADD_ALL(),
          method: 'POST',
          body: newCartItems,
          headers: {
            Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
          },
        }),
        invalidatesTags: ['CartItems'],
      }
    ),
    updateCartItem: builder.mutation<string, CartItem>({
      query: (updatedCart) => ({
        url: PBE.CART.UPDATE(),
        method: 'PUT',
        body: updatedCart,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result, _, args) => {
        return result ? [{type: 'CartItem', id: args.id}] : ['CartItems'];
      },
    }),
    deleteCartItem: builder.mutation<string, number>({
      query: (cartItemId) => ({
        url: PBE.CART.DELETE(cartItemId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result, _, args) => {
        return result ? [{type: 'CartItem', id: args}] : ['CartItems'];
      },
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useGetCartItemQuery,
  useAddCartItemMutation,
  useAddCartItemsMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartItemsApiSlice;
