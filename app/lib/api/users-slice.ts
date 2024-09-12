import {
  Address,
  NewAddress,
  User,
  AddressesCollection,
  DeleteAddressParams,
} from '@/app/lib/plamatio-backend/types';
import {apiSlice} from './api-slice';
import {PLAMATIO_BACKEND_ENDPOINTS as PBE} from '@/app/lib/plamatio-backend/endpoints';
import {getPlamatioBackendAPIKey} from '@/app/lib/plamatio-backend/utils';

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
    getUserAddresses: builder.query<AddressesCollection, string>({
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
      invalidatesTags: (result) => {
        return result ? ['Users', {type: 'User', id: result.id}] : ['Users'];
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
        return result ? ['Users', {type: 'User', id: args.id}] : ['Users'];
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
        return result ? ['Users', {type: 'User', id: args}] : ['Users'];
      },
    }),
    getAddress: builder.query<Address, number>({
      query: (addressId) => ({
        url: PBE.USERS.GET_ADDRESS(addressId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getPlamatioBackendAPIKey()}`,
        },
      }),
      providesTags: (result) => [{type: 'Address', id: result?.id}],
    }),
    addUserAddress: builder.mutation<Address, NewAddress>({
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
    deleteUserAddress: builder.mutation<string, DeleteAddressParams>({
      query: (deleteAddressRequestParams) => ({
        url: PBE.USERS.DELETE_ADDRESS(deleteAddressRequestParams),
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
  useGetAddressQuery,
  useGetUserAddressesQuery,
  useAddUserMutation,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useAddUserAddressMutation,
  useUpdateUserAddressMutation,
  useDeleteUserAddressMutation,
} = usersApiSlice;
