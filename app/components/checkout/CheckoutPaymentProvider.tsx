import getStripe from '@/app/lib/stripe/getStripe';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import {FC} from 'react';
import StripeTestCards from './StripeTestCards';
type CheckoutPaymentProviderProps = {
  clientSecret: string;
};

export const CheckoutPaymentProvider: FC<CheckoutPaymentProviderProps> = ({
  clientSecret,
}) => {
  return (
    <>
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{clientSecret}}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
      <StripeTestCards />
    </>
  );
};
