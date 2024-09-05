import {Address, User} from '@/app/types/backend-types';
import {apiSlice} from './api-slice';
import {
  getPlamatioBackendAPIKey,
  PLAMATIO_BACKEND_ENDPOINTS as PBE,
} from '../plamatio-api';

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
      providesTags: ['User'],
    }),
    getUserAddresses: builder.query<Address[], string>({
      query: (userId) => ({
        url: PBE.USERS.GET_ADDRESSES(userId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: ['Addresses'],
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
      invalidatesTags: ['User'],
    }),
    updateUserProfile: builder.mutation<User, User>({
      query: (updatedUser) => ({
        url: PBE.USERS.UPDATE_USER(),
        method: 'PUT',
        body: updatedUser,
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<User, string>({
      query: (userId) => ({
        url: PBE.USERS.DELETE(userId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: ['User'],
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
      invalidatesTags: ['Addresses'],
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
      invalidatesTags: ['Addresses'],
    }),
    deleteUserAddress: builder.mutation<string, number>({
      query: (addressId) => ({
        url: PBE.USERS.DELETE_ADDRESS(addressId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      invalidatesTags: ['Addresses'],
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
