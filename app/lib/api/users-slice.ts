import {Address, User} from '@/app/types/backend-types';
import {apiSlice} from './api-slice';
import {
  getPlamatioBackendAPIKey,
  PLAMATIO_BACKEND_ENDPOINTS as PBE,
} from '../plamatio-backend/plamatio-api';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userId) => ({
        url: PBE.USERS.GET(userId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => [{type: 'User', id: result?.id}],
    }),
    getUserAddresses: builder.query<Address[], string>({
      query: (userId) => ({
        url: PBE.USERS.GET_ADDRESSES(userId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result = []) => [
        'Addresses',
        ...result.map(({id}) => ({type: 'Address', id}) as const),
      ],
    }),
    addUser: builder.mutation<User, User>({
      query: (newUser) => ({
        url: PBE.USERS.ADD_USER(),
        method: 'POST',
        body: newUser,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result) => {
        return result ? [{type: 'User', id: result.id}] : ['Users'];
      },
    }),
    updateUserProfile: builder.mutation<string, User>({
      query: (updatedUser) => ({
        url: PBE.USERS.UPDATE_USER(),
        method: 'PUT',
        body: updatedUser,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result, _, args) => {
        return result ? [{type: 'User', id: args.id}] : ['Users'];
      },
    }),
    deleteUser: builder.mutation<string, string>({
      query: (userId) => ({
        url: PBE.USERS.DELETE(userId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result, _, args) => {
        return result ? [{type: 'User', id: args}] : ['Users'];
      },
    }),
    addUserAddress: builder.mutation<Address, Address>({
      query: (newAddress) => ({
        url: PBE.USERS.ADD_ADDRESS(),
        method: 'POST',
        body: newAddress,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result) => {
        return result ? [{type: 'Address', id: result.id}] : ['Addresses'];
      },
    }),
    updateUserAddress: builder.mutation<Address, Address>({
      query: (updatedAddress) => ({
        url: PBE.USERS.UPDATE_ADDRESS(),
        method: 'PUT',
        body: updatedAddress,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result) => {
        return result ? [{type: 'Address', id: result.id}] : ['Addresses'];
      },
    }),
    deleteUserAddress: builder.mutation<string, number>({
      query: (addressId) => ({
        url: PBE.USERS.DELETE_ADDRESS(addressId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: (result, _, args) => {
        return result ? [{type: 'Address', id: args}] : ['Addresses'];
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserAddressesQuery,
  useAddUserMutation,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useAddUserAddressMutation,
  useUpdateUserAddressMutation,
  useDeleteUserAddressMutation,
} = usersApiSlice;
