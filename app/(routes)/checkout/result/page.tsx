import type {Stripe} from 'stripe';

import {Raleway} from 'next/font/google';
import {stripe} from '@/app/lib/stripe/config';
import {NewDetailedOrderItem, NewOrder} from '@/app/lib/plamatio-backend/types';
import AddNewOrder from '@/app/components/checkout/AddNewOrder';
import {LoadingSpinner} from '@/app/components/ui/LoadingSpinner';

const raleway = Raleway({weight: '500', subsets: ['latin']});

export default async function ResultPage({
  searchParams,
}: {
  searchParams: {session_id: string};
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ['line_items', 'payment_intent'],
    });

  let orderObj: NewOrder | undefined;
  let orderItemsObj: NewDetailedOrderItem[] | undefined;
  if (checkoutSession.metadata) {
    try {
      orderObj = JSON.parse(checkoutSession.metadata.order);
      if (orderObj) {
        orderObj.status = 'succeeded';
      }
      orderItemsObj = JSON.parse(checkoutSession.metadata.items);
      console.log('metadataObject:', orderObj);
    } catch (error) {
      console.error('Error parsing metadata:', error);
    }
  } else {
    console.error(
      'checkoutSession.metadata is not a string:',
      checkoutSession.metadata
    );
  }

  return (
    <>
      <div className="w-full max-w-[1720px] h-full flex flex-col gap-5 items-start justify-start px-5 md:px-20 pt-5">
        <h1 className={`text-3xl text-violet-800 ${raleway.className}`}>
          Checkout
        </h1>
        {(!orderObj || !orderItemsObj) && (
          <LoadingSpinner label="Loading order details..." />
        )}

        {orderObj && orderItemsObj && (
          <AddNewOrder order={orderObj} items={orderItemsObj} />
        )}
      </div>
    </>
  );
}
