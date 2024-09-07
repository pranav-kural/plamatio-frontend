'use client';
import {MinusCircleIcon, PlusCircleIcon, ShoppingCartIcon} from 'lucide-react';
import classNames from 'classnames';
import {FC, useState} from 'react';
import {CartItem} from '@/app/types/backend-types';
import useLocalCartHooks from '@/app/lib/hooks/useLocalCartHooks';

type MutateCartButtonProps = {
  cartItem: CartItem;
  handleRemovalFromCart: () => void;
  className?: string;
  plusIconSize?: number;
  plusIconStrokeWidth?: number;
  minusIconSize?: number;
  minusIconStrokeWidth?: number;
  cartIconSize?: number;
  cartIconStrokeWidth?: number;
};

export const MutateCartButton: FC<MutateCartButtonProps> = ({
  cartItem,
  className,
  handleRemovalFromCart,
  plusIconSize,
  plusIconStrokeWidth,
  minusIconSize,
  minusIconStrokeWidth,
  cartIconSize,
  cartIconStrokeWidth,
}) => {
  // also, if user id is available, subscribe to the "cart_updates" topic
  // if new message received of event type "update_cart_item"
  // if cart item id matches the current cart item id, update the cart item if any changes
  const [productQuantity, setProductQuantity] = useState(cartItem.quantity);
  const localCart = useLocalCartHooks();

  function incrementQuantity() {
    // update local storage
    const updatedCartItem = localCart.incrementLocalQuantity(cartItem);
    // set quantity to display
    setProductQuantity(updatedCartItem.quantity);
  }

  function decrementQuantity() {
    // if quantity is 1, remove the product from cart
    if (productQuantity === 1) {
      // set quantity to 0
      localCart.decrementLocalQuantity(cartItem);
      // remove product from cart
      handleRemovalFromCart();
    } else {
      // update local storage
      const updatedCartItem = localCart.decrementLocalQuantity(cartItem);
      // set quantity to display
      setProductQuantity(updatedCartItem.quantity);
    }
  }

  return (
    <>
      <div
        className={classNames(
          'flex flex-row align-middle justify-center p-2 rounded-md bg-violet-100 cursor-pointer hover:text-violet-100 hover:bg-violet-800',
          className
        )}>
        <PlusCircleIcon
          onClick={incrementQuantity}
          size={plusIconSize}
          strokeWidth={plusIconStrokeWidth}
        />
        <span className="ml-2 mr-2">{productQuantity}</span>
        <MinusCircleIcon
          onClick={decrementQuantity}
          size={minusIconSize}
          strokeWidth={minusIconStrokeWidth}
        />
        <ShoppingCartIcon
          className="ml-2"
          size={cartIconSize}
          strokeWidth={cartIconStrokeWidth}
        />
      </div>
    </>
  );
};

export default MutateCartButton;
