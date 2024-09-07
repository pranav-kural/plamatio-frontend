'use client';

import {CartItem, Product} from '@/app/types/backend-types';
import {FC, useEffect, useState} from 'react';
import {MutateCartButton} from './mutateCartButton';
import {AddToCartButton} from './addToCartButton';
import {CartItemsCollection} from '@/app/lib/plamatio-backend/types';
import {LOCAL_STORAGE_KEYS} from '@/app/lib/localStorage';

type NoUserCartButtonProps = {
  product: Product;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
};

export const NoUserCartButton: FC<NoUserCartButtonProps> = (props) => {
  // state to hold which cart button to display
  const [displayMutateCartButton, setDisplayMutateCartButton] = useState(false);
  // state to store cart items
  const [cartItem, setCartItem] = useState<CartItem | undefined>(undefined);

  // method to handle addition to cart of a new product
  const handleAdditionToCart = (cartItem: CartItem) => {
    // set the cart item
    setCartItem(cartItem);
    // show the mutate cart button
    setDisplayMutateCartButton(true);
  };

  // method to handle removal from cart of a product
  const handleRemovalFromCart = () => {
    console.log(
      `Removing product from cart with id: ${props.product.id} ${cartItem}`
    );
    // set the cart item
    setCartItem(undefined);
    // hide the mutate cart button
    setDisplayMutateCartButton(false);
    console.log('Product removed from cart');
  };

  useEffect(() => {
    // if no cart item already available and window is available
    if (!cartItem && typeof window !== 'undefined') {
      // check local storage for cart items
      const cartItemsData = localStorage.getItem(LOCAL_STORAGE_KEYS.CART_ITEMS);
      // check if cart items available
      if (cartItemsData) {
        // parse the cart items
        const cartItems = JSON.parse(cartItemsData) as CartItemsCollection;
        // get the cart item matching the product id or the product provided in props
        const cartItem = cartItems?.data?.find(
          (item: CartItem) => item.productId === props.product.id
        );
        // if valid cart item available, set the cart item
        if (cartItem) {
          setCartItem(cartItem);
          setDisplayMutateCartButton(true);
        }
      }
    }
  }, [cartItem, props.product.id]);

  // if cart items not available or cart item for the product not available, show the add to cart button
  return displayMutateCartButton && cartItem ? (
    <MutateCartButton
      cartItem={cartItem}
      className={props.className}
      handleRemovalFromCart={handleRemovalFromCart}
    />
  ) : (
    <AddToCartButton
      product={props.product}
      handleAdditionToCart={handleAdditionToCart}
      showLabel={props.showLabel}
      className={props.className}
      labelClassName={props.labelClassName}
    />
  );
};

export default NoUserCartButton;
