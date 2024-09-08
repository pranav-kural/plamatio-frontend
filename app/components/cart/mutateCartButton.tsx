'use client';
import {MinusCircleIcon, PlusCircleIcon, ShoppingCartIcon} from 'lucide-react';
import classNames from 'classnames';
import {FC} from 'react';
import {CartItem} from '@/app/types/backend-types';
import {useAppDispatch} from '@/app/lib/store/storeHooks';
import {
  decrementQuantity,
  incrementQuantity,
} from '@/app/lib/store/reducers/cart/cartReducer';

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

  function incrementProductQuantity() {
    // increment quantity
    dispatch(incrementQuantity(cartItem));
  }

  function decrementProductQuantity() {
    // if quantity is 1, remove the product from cart
    if (cartItem.quantity === 1) {
      setShowMutateCartButton(false);
    }
    // decrement quantity
    dispatch(decrementQuantity(cartItem));
  }

  return (
    <>
      <div
        className={classNames(
          'flex flex-row align-middle justify-center p-2 rounded-md bg-violet-100 cursor-pointer hover:text-violet-100 hover:bg-violet-800',
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
