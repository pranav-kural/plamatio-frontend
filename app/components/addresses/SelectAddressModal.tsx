import React, {FC} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {XIcon} from 'lucide-react';
import {Address} from '@/app/types/backend-types';

type SelectAddressModalProps = {
  addresses: Address[];
  setSelectedAddress: (address: Address) => void;
};

const SelectAddressModal: FC<SelectAddressModalProps> = ({
  addresses,
  setSelectedAddress,
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="block text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
        Select address
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Select Address
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Select the shipping address you would like to use for this order.
        </Dialog.Description>
        <div className="p-4 md:p-5">
          <ul className="space-y-4 mb-4">
            {addresses.length > 0 &&
              addresses.map((address) => (
                <li key={address.id}>
                  <input
                    type="radio"
                    id={`address-${address.id}`}
                    name="address"
                    value={`address-${address.id}`}
                    className="hidden peer"
                    required
                    onChange={() => setSelectedAddress(address)}
                  />
                  <label
                    htmlFor={`address-${address.id}`}
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-violet-500 peer-checked:border-violet-600 peer-checked:text-violet-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                    <div className="block">
                      <div className="w-full text-sm font-[500]">
                        {address.street}, {address.city}, {address.state},{' '}
                        {address.country}, {address.zipCode}
                      </div>
                    </div>
                  </label>
                </li>
              ))}
          </ul>
          <Dialog.Close asChild>
            <button
              type="button"
              className="text-white inline-flex w-full justify-center bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
              aria-label="Close">
              Save
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close">
            <XIcon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default SelectAddressModal;
