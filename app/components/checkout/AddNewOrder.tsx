'use client';

import {useAddDetailedOrderMutation} from '@/app/lib/api/orders-slice';
import {NewDetailedOrderItem, NewOrder} from '@/app/lib/plamatio-backend/types';
import {useAppDispatch, useAppSelector} from '@/app/lib/store/storeHooks';
import {FC, useMemo, useRef} from 'react';
import {LoadingSpinner} from '../ui/LoadingSpinner';
import ErrorFetchingData from '../error/ErrorFetchingData';
import {
  clearCart,
  selectCartItems,
} from '@/app/lib/store/reducers/cart/cartReducer';
import Link from 'next/link';
import Image from 'next/image';
import {useUser} from '@clerk/nextjs';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {Logger} from '@/app/utils/logger/Logger';

const logger = new Logger({context: 'AddNewOrder'});

type AddNewOrderProps = {
  order: NewOrder;
  items: NewDetailedOrderItem[];
};

export const AddNewOrder: FC<AddNewOrderProps> = ({order, items}) => {
  // state to store order submitted status
  const orderSubmitted = useRef<boolean>(false);
  // dispatch to clear cart
  const dispatch = useAppDispatch();
  // select cart items
  const cartItems = useAppSelector(selectCartItems);
  // mutation to add new order
  const [addOrder, {isError, isLoading, isSuccess, error}] =
    useAddDetailedOrderMutation();
  // get user
  const {user} = useUser();

  useMemo(() => {
    if (
      !orderSubmitted.current &&
      order &&
      items &&
      cartItems &&
      cartItems.length > 0
    ) {
      // dispatch action to add new order
      addOrder({order, items});
    }
  }, [order, items, cartItems, addOrder]);

  useMemo(() => {
    if (
      isSuccess &&
      !orderSubmitted.current &&
      cartItems &&
      cartItems.length > 0
    ) {
      // set order submitted
      orderSubmitted.current = true;
      // record user event of adding new order
      if (user) {
        dispatchUserEvent({
          user_id: user.id,
          event_type: 'order_added',
          core_component: 'order',
          description: `New order submitted by user ${user.id}`,
          metadata: {cartItems: cartItems},
        });
      }
      // clear cart
      dispatch(clearCart());
    }
  }, [isSuccess, cartItems, dispatch, user]);

  // log error if any
  useMemo(() => {
    if (isError) {
      logger.error(`${Date.now()} AddNewOrder: Error adding new order`, error);
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
              href="/orders"
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
