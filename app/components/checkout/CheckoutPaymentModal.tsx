'use client';
import {FC, useEffect, useMemo, useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {ChevronRight, XIcon} from 'lucide-react';
import {CheckoutPaymentProvider} from './CheckoutPaymentProvider';
import {useAppSelector} from '@/app/lib/store/storeHooks';
import {useGetProductsQuery} from '@/app/lib/api/products-api-slice';
import {Product} from '@/app/types/backend-types';
import {selectCartItems} from '@/app/lib/store/reducers/cart/cartReducer';
import {createCheckoutSession} from '@/app/lib/stripe/actions';
import {getCartLineItems} from '@/app/lib/stripe/utils';
import {LoadingSpinner} from '../ui/loading-spinner';
import {NewDetailedOrderItem, NewOrder} from '@/app/lib/plamatio-backend/types';

type CheckoutPaymentModalProps = {
  label?: string;
  userId: string;
  addressId: number;
  totalPrice: number;
};

const CheckoutPaymentModal: FC<CheckoutPaymentModalProps> = ({
  label,
  userId,
  addressId,
  totalPrice,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // get cart items
  const cartItems = useAppSelector(selectCartItems);

  const productsFetch = useGetProductsQuery();
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  // Log error if any occurs during fetching  products
  useMemo(() => {
    if (productsFetch.isError) {
      console.error(
        `${Date.now()} CartWindow: Error fetching products for cart items`,
        productsFetch.error
      );
    }
  }, [productsFetch.isError, productsFetch.error]);

  useEffect(() => {
    if (productsFetch.isSuccess) {
      const products = productsFetch.data?.data.filter((product) =>
        cartItems.map((item) => item.product_id).includes(product.id)
      );
      if (products) {
        setProductsInCart(products);
      }
    }
  }, [productsFetch.isSuccess, cartItems, productsFetch.data?.data]);

  async function initiateCheckout() {
    setIsLoading(true);
    // prepare data for new order
    const newOrder: NewOrder = {
      user_id: userId,
      address_id: addressId,
      total_price: totalPrice,
      status: 'pending',
    };
    // prepare data for new order items
    const orderItems: NewDetailedOrderItem[] = cartItems.map((item) => {
      return {
        product_id: item.product_id,
        quantity: item.quantity,
      };
    });
    // create checkout session
    const {client_secret} = await createCheckoutSession({
      lineItems: getCartLineItems(cartItems, productsInCart),
      newOrder,
      newOrderItems: orderItems,
    });
    setIsLoading(false);
    return setClientSecret(client_secret);
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className="w-full block text-white bg-violet-700 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:text-white dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 disabled:bg-violet-950 disabled:text-gray-300 shadow-lg cursor-pointer"
            onClick={initiateCheckout}
            disabled={isLoading}>
            {label ?? 'Proceed to Pay'} <ChevronRight className="inline" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="z-20 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none h-auto overflow-y-scroll">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Checkout Payment
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Please fill out the payment details below to complete your order.
            </Dialog.Description>
            {isLoading || !clientSecret ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <LoadingSpinner label="Loading" className="text-gray-300" />
              </div>
            ) : (
              <CheckoutPaymentProvider clientSecret={clientSecret} />
            )}
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
    </>
  );
};

export default CheckoutPaymentModal;
