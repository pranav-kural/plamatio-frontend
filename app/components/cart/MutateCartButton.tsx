'use client';
import {MinusCircleIcon, PlusCircleIcon, ShoppingCartIcon} from 'lucide-react';
import classNames from 'classnames';
import {FC, useMemo} from 'react';
import {CartItem} from '@/app/types/backend-types';
import {useAppDispatch, useAppSelector} from '@/app/lib/store/storeHooks';
import {
  decrementQuantity,
  incrementQuantity,
  selectAllowCartChanges,
} from '@/app/lib/store/reducers/cart/cartReducer';
import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from '@/app/lib/api/cart-items-slice';

type MutateCartButtonIconsProps = {
  plusIconSize?: number;
  plusIconStrokeWidth?: number;
  minusIconSize?: number;
  minusIconStrokeWidth?: number;
  cartIconSize?: number;
  cartIconStrokeWidth?: number;
};

type MutateCartButtonProps = {
  cartItem: CartItem;
  className?: string;
  iconConfig?: MutateCartButtonIconsProps;
  setShowMutateCartButton: (state: boolean) => void;
};

export const MutateCartButton: FC<MutateCartButtonProps> = ({
  cartItem,
  className,
  iconConfig,
  setShowMutateCartButton,
}) => {
  // dispatch cart actions
  const dispatch = useAppDispatch();
  // monitor if cart changes are allowed
  const allowCartChanges = useAppSelector(selectAllowCartChanges);
  // handle mutations to cart items on database
  const [updateCartItem, {isError, error}] = useUpdateCartItemMutation();
  // handle removing cart item from database
  const [removeCartItem, {isError: isRemoveError, error: removeError}] =
    useDeleteCartItemMutation();

  function incrementProductQuantity() {
    // if cart changes allowed
    if (allowCartChanges) {
      // increment quantity
      dispatch(incrementQuantity(cartItem));
      // if cart item has a valid user id
      if (cartItem.userId && cartItem.userId.length > 0) {
        // update cart item in database
        updateCartItem(cartItem);
      }
    }
  }

  function decrementProductQuantity() {
    // if cart changes allowed
    if (allowCartChanges) {
      // if quantity is 1, remove the product from cart
      if (cartItem.quantity === 1) {
        setShowMutateCartButton(false);
      }
      // if cart item has a valid user id
      if (cartItem.userId && cartItem.userId.length > 0) {
        // if quantity is 1, remove the product from cart
        if (cartItem.quantity === 1) {
          // remove cart item from database
          removeCartItem(cartItem.id);
        } else {
          // update cart item in database
          updateCartItem({
            ...cartItem,
            quantity: cartItem.quantity - 1,
          });
        }
      }
      // decrement quantity (if quantity is 1, will automatically remove the product from cart)
      dispatch(decrementQuantity(cartItem));
    }
  }

  // Log any error in updating cart item on database
  useMemo(() => {
    if (isError) {
      console.error(`MutateCartButton: error updating cart item: ${error}`);
    }
  }, [isError, error]);

  // Log any error in removing cart item from database
  useMemo(() => {
    if (isRemoveError) {
      console.error(
        `MutateCartButton: error removing cart item: ${removeError}`
      );
    }
  }, [isRemoveError, removeError]);

  return (
    <>
      <div
        className={classNames(
          'flex flex-row align-middle justify-center p-2 rounded-md bg-violet-100 cursor-pointer hover:text-violet-100 hover:bg-violet-800',
          !allowCartChanges &&
            'opacity-50 hover:bg-violet-100 hover:text-black hover:cursor-not-allowed',
          className
        )}>
        <PlusCircleIcon
          onClick={incrementProductQuantity}
          size={iconConfig?.plusIconSize}
          strokeWidth={iconConfig?.plusIconStrokeWidth}
        />
        <span className="ml-2 mr-2">{cartItem.quantity}</span>
        <MinusCircleIcon
          onClick={decrementProductQuantity}
          size={iconConfig?.minusIconSize}
          strokeWidth={iconConfig?.minusIconStrokeWidth}
        />
        <ShoppingCartIcon
          className="ml-2"
          size={iconConfig?.cartIconSize}
          strokeWidth={iconConfig?.cartIconStrokeWidth}
        />
      </div>
    </>
  );
};

export default MutateCartButton;
