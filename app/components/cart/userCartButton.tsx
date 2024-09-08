'use client';
import {CartItem, Product} from '@/app/types/backend-types';
import {FC, useMemo} from 'react';
import {MutateCartButton} from './mutateCartButton';
import {AddToCartButton} from './addToCartButton';
import {useGetCartItemsQuery} from '@/app/lib/api/cart-items-slice';

type UserCartButtonProps = {
  userId: string;
  product: Product;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
};

export const UserCartButton: FC<UserCartButtonProps> = (props) => {
  // get cart items for the user
  const cartItemsData = useGetCartItemsQuery(props.userId);

  const getCartButton = useMemo(() => {
    // get cart item matching the product id or the product provided in props
    if (cartItemsData.isSuccess) {
      const cartItems = cartItemsData.data.data;
      // check if cart items available
      if (cartItems) {
        const cartItem = cartItems.find(
          (item: CartItem) => item.productId === props.product.id
        );
        // if valid cart item available, show the mutate cart button
        if (cartItem) {
          return (
            <MutateCartButton cartItem={cartItem} className={props.className} />
          );
        }
      }
    }

    // else show the add to cart button
    return (
      <AddToCartButton
        product={props.product}
        showLabel={props.showLabel}
        className={props.className}
        labelClassName={props.labelClassName}
      />
    );
  }, [
    cartItemsData,
    props.product,
    props.showLabel,
    props.className,
    props.labelClassName,
  ]);

  return getCartButton;
};

export default UserCartButton;
