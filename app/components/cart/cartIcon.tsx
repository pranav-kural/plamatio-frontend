'use client';
import classNames from 'classnames';
import {ShoppingBagIcon} from 'lucide-react';
import {FC, useState} from 'react';
import {CartWindow} from './cartWindow';

type CartIconProps = {
  className?: string;
  iconSize?: number;
  strokeWidth?: number;
  iconClassName?: string;
};

export const CartIcon: FC<CartIconProps> = ({
  className,
  iconSize,
  strokeWidth,
  iconClassName,
}) => {
  const [displayCartWindow, setDisplayCartWindow] = useState(false);

  return (
    <>
      <div className={classNames('', className)}>
        <button
          onClick={() => setDisplayCartWindow(!displayCartWindow)}
          className="text-violet-900">
          <ShoppingBagIcon
            size={iconSize || 35}
            strokeWidth={strokeWidth || 1}
            className={classNames('', iconClassName)}
          />
        </button>
      </div>
      {displayCartWindow && (
        <div className="z-10 absolute top-[50px] right-[10px] md:right-[0px] w-auto">
          <CartWindow />
        </div>
      )}
    </>
  );
};

export default CartIcon;
