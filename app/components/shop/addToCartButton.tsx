'use client';
import {PlusIcon, ShoppingCartIcon} from 'lucide-react';
import classNames from 'classnames';
import {FC, useEffect, useState} from 'react';
import {Toast} from '../toast/toast';
import {Product} from '@/app/types/backend-types';

type AddToCartButtonProps = {
  product: Product;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
};

export const AddToCartButton: FC<AddToCartButtonProps> = (
  props: AddToCartButtonProps
) => {
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 1500);
    }
  }, [toastVisible]);

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
        onClick={() => setToastVisible(true)}>
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
