'use client';
import {PlusIcon, ShoppingCartIcon} from 'lucide-react';
import classNames from 'classnames';
import {FC, useEffect, useState} from 'react';
import {Toast} from '../toast/toast';
import {CartItem, Product} from '@/app/types/backend-types';
// import useCartHooks from '@/app/lib/hooks/useCartHooks';
import useLocalCartHooks from '@/app/lib/hooks/useLocalCartHooks';

type AddToCartButtonProps = {
  product: Product;
  handleAdditionToCart: (cartItem: CartItem) => void;
  userId?: string;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
};

export const AddToCartButton: FC<AddToCartButtonProps> = (
  props: AddToCartButtonProps
) => {
  const [toastVisible, setToastVisible] = useState(false);
  const localCart = useLocalCartHooks();

  useEffect(() => {
    if (toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 1500);
    }
  }, [toastVisible]);

  const handleAddToCart = () => {
    // if user id not available
    if (!props.userId) {
      // add product to cart items in local storage
      const cartItem: CartItem = localCart.addProductToCartItemsLocalStorage(
        props.product.id
      );

      // update cart button
      props.handleAdditionToCart(cartItem);
    }

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
