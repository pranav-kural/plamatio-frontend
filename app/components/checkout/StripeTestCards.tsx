/*
 Source code: https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/app/components/StripeTestCards.tsx 
*/

import Link from 'next/link';

export default function StripeTestCards(): JSX.Element {
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-start text-sm p-2">
      <div>
        Use any of the{' '}
        <Link
          href="https://stripe.com/docs/testing#cards"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600">
          Stripe test cards
        </Link>{' '}
        for this demo.
      </div>
      <div className="w-full flex flex-col gap-5 items-center justify-start text-xs">
        <div className="w-full flex flex-row justify-between items-center">
          <div>Payment succeeds</div>
          <div className="min-w-[130px]">4242 4242 4242 4242</div>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <div>Payment requires authentication</div>
          <div className="min-w-[130px]">4000 0025 0000 3155</div>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <div>Payment is declined</div>
          <div className="min-w-[130px]">4000 0000 0000 9995</div>
        </div>
      </div>
    </div>
  );
}
