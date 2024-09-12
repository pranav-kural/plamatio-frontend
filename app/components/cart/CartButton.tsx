'use client';
import {Product} from '@/app/lib/plamatio-backend/types';
import {FC} from 'react';
import StatefulCartButton from '@/app/components/cart/StatefulCartButton';
import {useUser} from '@clerk/nextjs';
import LoadingSpinner from '../ui/LoadingSpinner';
import MergeCartItems from './MergeCartItems';

type CartButtonProps = {
  product: Product;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
};

export const CartButton: FC<CartButtonProps> = (props) => {
  // get user id
  const {isLoaded, user} = useUser();
  // if user is not available
  return (
    <>
      {!isLoaded ? (
        <LoadingSpinner />
      ) : (
        <>
          <StatefulCartButton
            userId={user?.id}
            product={props.product}
            showLabel={props.showLabel}
            className={props.className}
            labelClassName={props.labelClassName}
          />
          {user && <MergeCartItems userId={user.id} />}
        </>
      )}

      {/* If user signed in, merge cart items if any difference between local cart items & database */}
    </>
  );
};

export default CartButton;
