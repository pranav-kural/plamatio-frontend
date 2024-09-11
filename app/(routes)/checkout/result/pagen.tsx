'use client';
import type {Stripe} from 'stripe';
import {stripe} from '@/app/lib/stripe/config';
// import PaymentRetryModal from '@/app/components/checkout/PaymentRetryModal';
import {getNewDetailedOrder} from '@/app/lib/stripe/utils';
import {useUser} from '@clerk/nextjs';
import {useEffect, useMemo, useState} from 'react';
import {NewDetailedOrder} from '@/app/lib/plamatio-backend/types';
// import {useAddOrderMutation} from '@/app/lib/api/orders-slice';

export default function ResultPage({
  searchParams,
}: {
  searchParams: {session_id: string};
}): JSX.Element {
  // get user details
  const {isLoaded, user} = useUser();
  // new order mutation
  // const [createOrder, {data, error, isLoading}] = useAddOrderMutation();

  const [detailedOrder, setDetailedOrder] = useState<NewDetailedOrder | null>(
    null
  );
  const [checkoutSession, setCheckoutSession] = useState<
    Stripe.Checkout.Session | undefined
  >(undefined);
  const [paymentIntent, setPaymentIntent] = useState<
    Stripe.PaymentIntent | undefined
  >(undefined);
  const [formattedContent, setFormattedContent] = useState<string | null>(null);

  if (!searchParams.session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  useMemo(async () => {
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(searchParams.session_id, {
        expand: ['line_items', 'payment_intent'],
      });

    setCheckoutSession(checkoutSession);

    const paymentIntent =
      checkoutSession.payment_intent as Stripe.PaymentIntent;

    setPaymentIntent(paymentIntent);

    const formattedContent: string = JSON.stringify(checkoutSession, null, 2);

    setFormattedContent(formattedContent);
  }, [searchParams.session_id]);

  useEffect(() => {
    if (isLoaded && user && checkoutSession) {
      const newDetailedOrder = getNewDetailedOrder(user.id, checkoutSession);
      setDetailedOrder(newDetailedOrder);
    }
  }, [isLoaded, user, checkoutSession, setDetailedOrder]);

  return (
    <>
      {/* {checkoutSession &&
        paymentIntent?.status === 'requires_payment_method' && (
          <PaymentRetryModal
            clientSecret={checkoutSession.client_secret}
            label="Retry Payment"
          />
        )}

      {checkoutSession && paymentIntent?.status === 'requires_action' && (
        <PaymentRetryModal
          clientSecret={checkoutSession.client_secret}
          label="Complete Payment"
        />
      )} */}

      {paymentIntent?.status === 'succeeded' && (
        <div className="w-full flex flex-col gap-5">
          <div className="text-lg font-[500]">Order Successful 🥳🎉</div>
          <div className="text-lg font-[500]">
            <pre>{formattedContent}</pre>
          </div>
        </div>
      )}

      {paymentIntent?.status === 'canceled' && (
        <div className="w-full flex flex-col gap-5">
          <div className="text-lg font-[500]">Order status: Cancelled 🥺</div>
          <div className="text-lg font-[500]">
            Reason: {paymentIntent.cancellation_reason}
          </div>
          {/* <PaymentRetryModal
            clientSecret={paymentIntent.client_secret}
            label="Retry Payment"
          /> */}
        </div>
      )}

      {detailedOrder && JSON.stringify(detailedOrder, null, 2)}
    </>
  );
}
