'use client';
import {useGetAddressQuery} from '@/app/lib/api/users-slice';
import {FC, useMemo} from 'react';
import {LoadingSpinner} from '../ui/loading-spinner';
import ErrorFetchingData from '../error/ErrorFetchingData';

type OrderAddressProps = {
  addressId: number;
};

export const OrderAddress: FC<OrderAddressProps> = ({addressId}) => {
  console.log(`Received address ID: ${addressId}`);
  // fetch the address details from the backend
  const addressFetch = useGetAddressQuery(addressId);

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (addressFetch.isError) {
      console.error(
        `${Date.now()} OrderAddress: Error fetching data: address ID ${addressId}`,
        addressFetch.error
      );
    }
  }, [addressFetch.isError, addressFetch.error, addressId]);

  return (
    <>
      {/* While loading */}
      {addressFetch.isLoading && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <LoadingSpinner label="Loading data..." />
        </div>
      )}

      {/* If error occurs */}
      {addressFetch.isError && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <ErrorFetchingData refetchMethod={addressFetch.refetch} />
        </div>
      )}

      {addressFetch.isSuccess && addressFetch.data && (
        <div className="w-full">
          <h2 className="text-gray-500">Shipping Address</h2>
          <p>
            {addressFetch.data.street}, {addressFetch.data.city},{' '}
            {addressFetch.data.state}, {addressFetch.data.country},{' '}
            {addressFetch.data.zipCode}
          </p>
        </div>
      )}
    </>
  );
};

export default OrderAddress;
