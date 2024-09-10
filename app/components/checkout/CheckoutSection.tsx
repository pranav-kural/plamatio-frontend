'use client';

import {useState} from 'react';

import {getLineItems} from '@/app/lib/stripe/utils';
import {createCheckoutSession} from '@/app/lib/stripe/actions';
import {Product} from '@/app/types/backend-types';
import {LoadingSpinner} from '../ui/loading-spinner';
import CheckoutPaymentModal from './CheckoutPaymentModal';

interface CheckoutSectionProps {
  products: Product[];
}

export default function CheckoutSection(
  props: CheckoutSectionProps
): JSX.Element {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function initiateCheckout() {
    setIsLoading(true);
    const {client_secret} = await createCheckoutSession({
      lineItems: getLineItems(props.products),
      uiMode: 'embedded',
    });

    setIsLoading(false);
    return setClientSecret(client_secret);
  }

  return (
    <>
      <div className="w-full animate animate-slideIn transition-transform">
        {isLoading || !clientSecret ? (
          <button
            className="w-full block text-white bg-violet-700 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:text-white dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 disabled:bg-violet-950 disabled:text-gray-300 shadow-lg cursor-pointer"
            onClick={initiateCheckout}
            disabled={isLoading}>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <LoadingSpinner label="Loading" className="text-gray-300" />
            </div>
          </button>
        ) : (
          <CheckoutPaymentModal />
        )}
      </div>
    </>
  );
}
