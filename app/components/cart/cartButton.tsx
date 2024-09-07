import {Product} from '@/app/types/backend-types';
import {FC} from 'react';
import {UserCartButton} from './userCartButton';
import NoUserCartButton from './noUserCartButton';

type CartButtonProps = {
  product: Product;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
};

export const CartButton: FC<CartButtonProps> = (props) => {
  // get user id
  const userId = undefined;
  // if user is not available
  return !userId ? (
    <NoUserCartButton
      product={props.product}
      showLabel={props.showLabel}
      className={props.className}
      labelClassName={props.labelClassName}
    />
  ) : (
    // if user available
    <UserCartButton
      userId={userId}
      product={props.product}
      showLabel={props.showLabel}
      className={props.className}
      labelClassName={props.labelClassName}
    />
  );
};

export default CartButton;
