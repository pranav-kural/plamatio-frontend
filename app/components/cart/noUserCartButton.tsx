'use client';

import {CartItem, Product} from '@/app/types/backend-types';
import {FC, useEffect, useMemo, useState} from 'react';
import {MutateCartButton} from './mutateCartButton';
import {AddToCartButton} from './addToCartButton';
import {useAppSelector} from '@/app/lib/store/storeHooks';
import {selectCartItems} from '@/app/lib/store/reducers/cart/cartReducer';

type NoUserCartButtonProps = {
  product: Product;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
};

export const NoUserCartButton: FC<NoUserCartButtonProps> = (props) => {
  // state to store cart items
  const [cartItem, setCartItem] = useState<CartItem | undefined>(undefined);
  // use selector to get cart items from redux store
  const cartItems = useAppSelector(selectCartItems);
  // state to control which button to show
  const [showMutateCartButton, setShowMutateCartButton] =
    useState<boolean>(false);

  useEffect(() => {
    // if no cart item already available
    if (!cartItem) {
      // check if cart items available
      if (cartItems) {
        // get the cart item matching the product id or the product provided in props
        const cartItem = cartItems.find(
          (item: CartItem) => item.productId === props.product.id
        );
        console.log(`NoUserCartButton: cart item: ${cartItem}`);
        // if valid cart item available, set the cart item
        if (cartItem) {
          setCartItem(cartItem);
          setShowMutateCartButton(true);
        }
      }
    }
  }, [cartItem, cartItems, props.product.id]);

  useMemo(() => {
    // check if cart items available
    if (cartItems) {
      // get the cart item matching the product id or the product provided in props
      const cartItem = cartItems.find(
        (item: CartItem) => item.productId === props.product.id
      );
      // if valid cart item available, set the cart item
      if (cartItem) {
        setCartItem(cartItem);
        setShowMutateCartButton(true);
      }
    }
  }, [cartItems, props.product.id]);

  // if cart items not available or cart item for the product not available, show the add to cart button
  return showMutateCartButton && cartItem ? (
    <MutateCartButton
      cartItem={cartItem}
      className={props.className}
      setShowMutateCartButton={setShowMutateCartButton}
    />
  ) : (
    <AddToCartButton
      product={props.product}
      showLabel={props.showLabel}
      className={props.className}
      labelClassName={props.labelClassName}
    />
  );
};

export default NoUserCartButton;
