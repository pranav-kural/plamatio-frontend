import {DetailedOrder, Order} from '@/app/types/backend-types';
import {apiSlice} from './api-slice';
import {
  getPlamatioBackendAPIKey,
  PLAMATIO_BACKEND_ENDPOINTS as PBE,
} from '../plamatio-backend/plamatio-api';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], string>({
      query: (userId: string) => ({
        url: PBE.ORDERS.GET_ALL(userId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result = []) => [
        'Orders',
        ...result.map(({id}) => ({type: 'Order', id}) as const),
      ],
    }),
    addOrder: builder.mutation<Order, DetailedOrder>({
      query: (newOrder) => ({
        url: PBE.ORDERS.ADD(),
        method: 'POST',
        body: newOrder,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result) => {
        return result ? [{type: 'Order', id: result.id}] : ['Orders'];
      },
    }),
    updateOrder: builder.mutation<string, Order>({
      query: (updatedOrder) => ({
        url: PBE.ORDERS.UPDATE(),
        method: 'PUT',
        body: updatedOrder,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result, _, args) => {
        return result ? [{type: 'Order', id: args.id}] : ['Orders'];
      },
    }),
    deleteOrder: builder.mutation<string, number>({
      query: (orderId) => ({
        url: PBE.ORDERS.DELETE(orderId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result, _, args) => {
        return result ? [{type: 'Order', id: args}] : ['Orders'];
      },
    }),
    getDetailedOrder: builder.query<DetailedOrder, number>({
      query: (orderId) => ({
        url: PBE.ORDERS.GET(orderId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => {
        if (result) {
          return [
            {type: 'Order', id: result.order.id},
            ...result.orderItems.map(
              ({id}) => ({type: 'OrderItem', id}) as const
            ),
          ];
        } else {
          return [];
        }
      },
    }),
    addDetailedOrder: builder.mutation<DetailedOrder, DetailedOrder>({
      query: (newOrder) => ({
        url: PBE.ORDERS.ADD_DETAILED(),
        method: 'POST',
        body: newOrder,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result) => {
        if (result) {
          return [
            {type: 'Order', id: result.order.id},
            ...result.orderItems.map(
              ({id}) => ({type: 'OrderItem', id}) as const
            ),
          ];
        } else {
          return ['Orders'];
        }
      },
    }),
    getDetailedOrders: builder.query<DetailedOrder[], string>({
      query: (userId) => ({
        url: PBE.ORDERS.GET_ALL_DETAILED(userId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result = []) => {
        if (result) {
          return [
            'Orders',
            ...result.map(
              ({order}) => ({type: 'Order', id: order.id}) as const
            ),
            ...result.flatMap(({orderItems}) =>
              orderItems.map(({id}) => ({type: 'OrderItem', id}) as const)
            ),
          ];
        } else {
          return ['Orders'];
        }
      },
    }),
  }),
});

// export const {
//   useGetCartItemsQuery,
//   useGetCartItemQuery,
//   useAddCartItemMutation,
//   useUpdateCartItemMutation,
//   useDeleteCartItemMutation,
// } = cartItemsApiSlice;
