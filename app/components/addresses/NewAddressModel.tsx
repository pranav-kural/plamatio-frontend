import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {XIcon} from 'lucide-react';
import NewAddressForm from './NewAddressForm';

const NewAddressModal = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="block text-violet-700  hover:text-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center dark:text-white dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
        Add new address
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Add New Address
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Fill out the form below to add a new address to your account.
        </Dialog.Description>
        <NewAddressForm />
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

export default NewAddressModal;
