'use client';

import {useAddDetailedOrderMutation} from '@/app/lib/api/orders-slice';
import {NewDetailedOrderItem, NewOrder} from '@/app/lib/plamatio-backend/types';
import {useAppDispatch, useAppSelector} from '@/app/lib/store/storeHooks';
import {FC, useMemo, useState} from 'react';
import {LoadingSpinner} from '../ui/loading-spinner';
import ErrorFetchingData from '../error/errorFetchingData';
import {
  clearCart,
  selectCartItems,
} from '@/app/lib/store/reducers/cart/cartReducer';
import Link from 'next/link';
import Image from 'next/image';

type AddNewOrderProps = {
  order: NewOrder;
  items: NewDetailedOrderItem[];
};

export const AddNewOrder: FC<AddNewOrderProps> = ({order, items}) => {
  // track if order has been submitted
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  // dispatch to clear cart
  const dispatch = useAppDispatch();
  // select cart items
  const cartItems = useAppSelector(selectCartItems);
  // mutation to add new order
  const [addOrder, {isError, isLoading, isSuccess, error}] =
    useAddDetailedOrderMutation();

  useMemo(() => {
    if (
      !orderSubmitted &&
      order &&
      items &&
      cartItems &&
      cartItems.length > 0
    ) {
      console.log(`Adding new order`);
      // dispatch action to add new order
      addOrder({order, items});
    }
  }, [order, items, orderSubmitted, cartItems, addOrder]);

  useMemo(() => {
    if (isSuccess && !orderSubmitted && cartItems && cartItems.length > 0) {
      console.log(`Order added`);
      // clear cart
      dispatch(clearCart());
      // set order submitted
      setOrderSubmitted(true);
    }
  }, [isSuccess, orderSubmitted, cartItems, dispatch]);

  // log error if any
  useMemo(() => {
    if (isError) {
      console.error(`${Date.now()} AddNewOrder: Error adding new order`, error);
    }
  }, [isError, error]);

  return (
    <>
      <div className="w-full flex flex-col gap-5 items-center justify-center">
        {isLoading && (
          <div className="w-full">
            <LoadingSpinner label="Please wait..." />
          </div>
        )}

        {isError && (
          <div className="w-full bg-red-100 text-red-700 p-4 rounded-md">
            <ErrorFetchingData />
          </div>
        )}

        {isSuccess && (
          <>
            <div className=" bg-green-100 text-green-700 p-4 rounded-md text-xl">
              Order submitted successfully 🎉
            </div>
            <Link
              href="/orders/all"
              title="View all orders"
              className="text-xl text-white bg-violet-700 font-[500] hover:bg-violet-800 p-5 rounded-lg">
              View all orders
            </Link>
            <Image
              src="/images/llama_face.png"
              alt="happy llama"
              width={300}
              height={300}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AddNewOrder;
