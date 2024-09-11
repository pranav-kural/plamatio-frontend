'use client';
import {Address} from '@/app/types/backend-types';
import {FC, useMemo, useState} from 'react';

import NewAddressModal from '../addresses/NewAddressModel';
import {useGetUserAddressesQuery} from '@/app/lib/api/users-slice';
import {LoadingSpinner} from '../ui/loading-spinner';
import SelectAddressModal from '../addresses/SelectAddressModal';

type AddressesSectionProps = {
  userId: string;
  setAddressId: (addressId: number) => void;
};

export const AddressesSection: FC<AddressesSectionProps> = ({
  userId,
  setAddressId,
}) => {
  const addressesFetch = useGetUserAddressesQuery(userId);
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    undefined
  );

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (addressesFetch.isError) {
      console.error(
        `${Date.now()} AddressesSection: Error fetching addresses for user ${userId}`,
        addressesFetch.error
      );
    }
  }, [addressesFetch.isError, addressesFetch.error, userId]);

  // set selected address once addresses are fetched
  useMemo(() => {
    // if no address is selected and addresses are fetched successfully
    if (
      !selectedAddress &&
      addressesFetch.isSuccess &&
      addressesFetch.data?.data
    ) {
      // check for primary address
      const primaryAddress = addressesFetch.data?.data?.find(
        (address) => address.primary
      );
      // if primary address exists, set it as selected address, else set first address
      setSelectedAddress(primaryAddress || addressesFetch.data.data[0]);
    }
  }, [addressesFetch.isSuccess, addressesFetch.data?.data, selectedAddress]);

  // if all address deleted, set selected address to undefined
  useMemo(() => {
    if (
      addressesFetch.isSuccess &&
      (!addressesFetch.data?.data || addressesFetch.data?.data.length === 0)
    ) {
      setSelectedAddress(undefined);
    }
  }, [addressesFetch.isSuccess, addressesFetch.data?.data]);

  // set selected address ID
  useMemo(() => {
    if (selectedAddress) {
      setAddressId(selectedAddress.id);
    }
  }, [selectedAddress, setAddressId]);

  function updatePrimarySelectedAddress() {
    if (addressesFetch.data?.data) {
      const primaryAddress = addressesFetch.data?.data?.find(
        (address) => address.primary
      );
      setSelectedAddress(primaryAddress || addressesFetch.data.data[0]);
    } else {
      setSelectedAddress(undefined);
    }
  }

  const refetchData = () => {
    addressesFetch.refetch();
  };

  return (
    <>
      <div className="w-full md:min-h-[200px] flex flex-col gap-3 p-5 justify-between border border-fuchsia-800 rounded-lg shadow-lg dark:text-white dark:bg-fuchsia-800 dark:focus:ring-violet-800">
        <h2 className="font-[500]">Shipping To</h2>
        {addressesFetch.isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <LoadingSpinner label="Loading addresses..." />
          </div>
        )}
        {addressesFetch.isSuccess && selectedAddress && (
          <>
            <div className="w-full flex flex-row">
              <div className="w-full">
                <h2 className="text-gray-500 dark:text-gray-300">
                  Current Address
                </h2>
                <p>
                  {selectedAddress.street}, {selectedAddress.city},{' '}
                  {selectedAddress.state}, {selectedAddress.country},{' '}
                  {selectedAddress.zipCode}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row justify-between">
              <SelectAddressModal
                addresses={addressesFetch.data?.data || []}
                setSelectedAddress={setSelectedAddress}
                updatePrimarySelectedAddress={updatePrimarySelectedAddress}
                userId={userId}
              />
              <NewAddressModal userId={userId} refetchData={refetchData} />
            </div>
          </>
        )}
        {addressesFetch.isSuccess && !selectedAddress && (
          <>
            <div className="w-full flex flex-row">
              <div className="w-full">
                <h2 className="text-gray-500">
                  You currently have no addresses on this account. Please add a
                  new address to continue.
                </h2>
              </div>
            </div>
            <div className="w-full">
              <NewAddressModal userId={userId} refetchData={refetchData} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddressesSection;
