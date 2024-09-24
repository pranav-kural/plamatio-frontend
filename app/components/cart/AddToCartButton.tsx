'use client';
import {PlusIcon, ShoppingCartIcon} from 'lucide-react';
import classNames from 'classnames';
import {FC, useEffect, useMemo, useState} from 'react';
import {Toast} from '../toast/Toast';
import {CartItem, Product} from '@/app/lib/plamatio-backend/types';
import {useAppDispatch} from '@/app/lib/store/storeHooks';
import {addCartItem} from '@/app/lib/store/reducers/cart/cartReducer';
import {useAddCartItemMutation} from '@/app/lib/api/cart-items-slice';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';

type AddToCartButtonProps = {
  product: Product;
  userId?: string;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
};

export const AddToCartButton: FC<AddToCartButtonProps> = (
  props: AddToCartButtonProps
) => {
  const [toastVisible, setToastVisible] = useState(false);
  // dispatch cart actions
  const dispatch = useAppDispatch();
  // when user logged in, need to add cart item to database
  const [addCartItemToDB, {isError, error}] = useAddCartItemMutation();

  // Log any error in updating cart item on database
  useMemo(() => {
    if (isError) {
      console.error(`AddToCartButton: error adding cart item: ${error}`);
    }
  }, [isError, error]);

  useEffect(() => {
    if (toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 1500);
    }
  }, [toastVisible]);

  const handleAddToCart = async () => {
    // prepare cart item
    const cartItemToAdd: CartItem = {
      id: Math.floor(Math.random() * 10000),
      product_id: props.product.id,
      quantity: 1,
      user_id: props.userId && props.userId.length > 0 ? props.userId : '', // no user id if not logged in
    };

    // if valid user id, add cart item to database
    if (props.userId && props.userId.length > 0) {
      console.log(
        `AddToCartButton: adding cart item to database for user: ${props.userId}`
      );
      const r = await addCartItemToDB({
        product_id: cartItemToAdd.product_id,
        quantity: cartItemToAdd.quantity,
        user_id: cartItemToAdd.user_id,
      });
      if (r.data) {
        cartItemToAdd.id = r.data.id;

        // dispatch event to record event of adding product to cart
        dispatchUserEvent({
          user_id: props.userId,
          event_type: 'cart_item_added',
          core_component: 'cart',
          description: `Added product (id: ${props.product.id}) to cart`,
          metadata: {cart_item: cartItemToAdd},
        });
      } else {
        console.error(`AddToCartButton: error adding cart item: ${r.error}`);
      }
    }

    // add product to cart items
    dispatch(addCartItem(cartItemToAdd));

    // show toast
    setToastVisible(true);
  };

  return (
    <>
      <Toast
        title="Added to Cart"
        visible={toastVisible}
        setVisible={setToastVisible}
        description={`${props.product.name} has been added to your cart.`}
      />
      <button
        className={classNames(
          'flex flex-row align-middle justify-center p-2 rounded-md bg-violet-100 cursor-pointer hover:text-violet-100 hover:bg-violet-800',
          props.className
        )}
        onClick={handleAddToCart}>
        {props.showLabel && (
          <span
            className={classNames('text-lg ml-3 mr-3', props.labelClassName)}>
            Add to Cart
          </span>
        )}
        <PlusIcon />
        <ShoppingCartIcon />
      </button>
    </>
  );
};

export default AddToCartButton;
