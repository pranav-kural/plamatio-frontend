'use server';
import type {Stripe} from 'stripe';
import {headers} from 'next/headers';
import {stripe} from '@/app/lib/stripe/config';
import {NewDetailedOrderItem, NewOrder} from '@/app/lib/plamatio-backend/types';

/**
 * Method to get the return URL for the checkout session.
 * @param origin Origin of the request
 * @returns String with the return URL for the checkout session
 */
export const getReturnUrl = (origin: string) => {
  return `${origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`;
};

/**
 * Method to create a checkout session.
 * @param lineItems Line items for the checkout session
 * @returns Object with the client secret and URL for the checkout session
 */
export async function createCheckoutSession({
  lineItems,
  newOrder,
  newOrderItems,
}: {
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  newOrder: NewOrder;
  newOrderItems: NewDetailedOrderItem[];
}): Promise<{client_secret: string | null; url: string | null}> {
  const origin: string = headers().get('origin') as string;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      return_url: `${origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      ui_mode: 'embedded',
      metadata: {
        order: JSON.stringify(newOrder),
        items: JSON.stringify(newOrderItems),
      },
    });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}
