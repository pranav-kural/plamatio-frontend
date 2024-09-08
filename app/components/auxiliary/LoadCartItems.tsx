'use client';
import {loadItemsFromLocalStorage} from '@/app/lib/store/reducers/cart/cartReducer';
import {useAppDispatch} from '@/app/lib/store/storeHooks';

export const LoadCartItems = () => {
  const dispatch = useAppDispatch();

  // load cart items
  dispatch(loadItemsFromLocalStorage());

  return <></>;
};

export default LoadCartItems;
