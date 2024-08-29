import {PlusIcon, ShoppingCartIcon} from 'lucide-react';
import classNames from 'classnames';
import {FC} from 'react';

type AddToCartButtonProps = {
  id: number;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
};

export const AddToCartButton: FC<AddToCartButtonProps> = (
  props: AddToCartButtonProps
) => {
  return (
    <button
      className={classNames(
        'flex flex-row align-middle justify-center p-2 rounded-md bg-violet-100 cursor-pointer hover:text-violet-100 hover:bg-violet-800',
        props.className
      )}>
      {props.showLabel && (
        <span className={classNames('text-lg ml-3 mr-3', props.labelClassName)}>
          Add to Cart
        </span>
      )}
      <PlusIcon />
      <ShoppingCartIcon />
    </button>
  );
};

export default AddToCartButton;
