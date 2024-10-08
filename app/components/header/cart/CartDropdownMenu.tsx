'use client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {ShoppingBagIcon} from 'lucide-react';
import {CartDropdownItems} from './CartDropdownItems';
import {useAppSelector} from '@/app/lib/store/storeHooks';
import {selectCartItems} from '@/app/lib/store/reducers/cart/cartReducer';

const CartDropdownMenu = () => {
  // const userId: string | undefined = undefined;
  const cartItems = useAppSelector(selectCartItems);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet-800 bg-white outline-none hover:bg-violet3"
          aria-label="Cart Items">
          <div className="relative">
            <ShoppingBagIcon
              size={35}
              strokeWidth={1}
              className="mt-1 relative"
            />
            {cartItems.length > 0 && (
              <span className="absolute -bottom-1 right-0 bg-violet-700 text-white text-xs font-bold rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-20 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mr-7"
          sideOffset={5}>
          <DropdownMenu.Item className="group leading-none flex items-center relative select-none outline-none">
            <CartDropdownItems />
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-violet-700 mr-7" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default CartDropdownMenu;
