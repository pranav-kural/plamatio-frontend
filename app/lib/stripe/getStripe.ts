/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import {Stripe, loadStripe} from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export default function getStripe(): Promise<Stripe | null> {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Stripe publishable key is missing');
  }

  if (!stripePromise)
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );

  return stripePromise;
}
