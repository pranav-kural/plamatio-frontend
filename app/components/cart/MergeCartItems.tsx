'use client';
import {
  useAddCartItemsMutation,
  useGetCartItemsQuery,
} from '@/app/lib/api/cart-items-slice';
import {NewCartItem} from '@/app/lib/plamatio-backend/types';
import {
  selectCartItems,
  setNewCartItems,
} from '@/app/lib/store/reducers/cart/cartReducer';
import {useAppDispatch, useAppSelector} from '@/app/lib/store/storeHooks';
import {CartItem} from '@/app/types/backend-types';
import {FC, useEffect, useMemo, useRef} from 'react';

/*
Merging cart items from local storage and database:
- If local storage has more items than database
  - Add all items from database to merged cart.
  - Add items from local storage, that are not already in merged cart, to merged cart. Also, add these items to a separate array of items to be added to database.
  - Add missing items to database.
- If database has more items than local storage
  - Add all items from local storage to merged cart.
  - Add items from database, that are not already in merged cart, to merged cart.
- If both have same number of items
  - Add all items from database to merged cart.
  - Add all items from local storage, that are not already in merged cart, to merged cart. Also, add these items to a separate array of items to be added to database.
  - Add missing items to database.
  */
function mergeCartItems(localCartItems: CartItem[], dbCartItems: CartItem[]) {
  // store merge cart items
  const mergedCartItems: CartItem[] = [];
  // store items to be added to database
  const itemsToAddToDB: NewCartItem[] = [];

  // if database has more items than local storage
  if (dbCartItems.length > localCartItems.length) {
    // add all local storage items to merged cart
    mergedCartItems.push(...localCartItems);
    // iterate through database items
    for (let i = 0; i < dbCartItems.length; i++) {
      // if dbCartItems[i] is not in mergedCartItems
      if (
        !mergedCartItems.find(
          (item) => item.productId === dbCartItems[i].productId
        )
      ) {
        // add dbCartItems[i] to mergedCartItems
        mergedCartItems.push(dbCartItems[i]);
      }
    }

    // return merged cart items
    return {mergedCartItems, itemsToAddToDB};
  }

  // if local storage have more than or equal items to database
  // add all dbCartItems to merged cart
  mergedCartItems.push(...dbCartItems);

  // iterate through local storage items
  for (let i = 0; i < localCartItems.length; i++) {
    // if localCartItems[i] is not in mergedCartItems
    if (
      !mergedCartItems.find(
        (item) => item.productId === localCartItems[i].productId
      )
    ) {
      // add localCartItems[i] to mergedCartItems
      mergedCartItems.push(localCartItems[i]);
      // add localCartItems[i] to itemsToAddToDB
      itemsToAddToDB.push({
        product_id: localCartItems[i].productId,
        quantity: localCartItems[i].quantity,
        user_id: localCartItems[i].userId,
      });
    }
  }

  // return merged cart items and items to be added to database
  return {mergedCartItems, itemsToAddToDB};
}

type MergeCartItemsProps = {
  userId: string;
};

export const MergeCartItems: FC<MergeCartItemsProps> = ({userId}) => {
  // get cart items for the user
  const userCartItemsFetch = useGetCartItemsQuery(userId);
  // use selector to get cart items from redux store
  const localCartItems = useAppSelector(selectCartItems);
  // dispatch to set new cart items
  const dispatch = useAppDispatch();
  // mutation to add cart items to database
  const [addCartItems, addCartItemsRequest] = useAddCartItemsMutation();
  // flag to ensure useEffect runs only once
  const ranOnce = useRef(false);

  useEffect(() => {
    if (
      !ranOnce.current &&
      userCartItemsFetch.isSuccess &&
      userCartItemsFetch.data?.data
    ) {
      ranOnce.current = true;
      // merge cart items from local storage and from database
      const {mergedCartItems, itemsToAddToDB} = mergeCartItems(
        localCartItems,
        userCartItemsFetch.data.data
      );
      // set new cart items
      dispatch(setNewCartItems(mergedCartItems));
      // add missing items to database
      if (itemsToAddToDB.length > 0) {
        addCartItems({
          data: itemsToAddToDB,
        });
      }
    }
  }, [
    userCartItemsFetch.data,
    userCartItemsFetch.isSuccess,
    localCartItems,
    addCartItems,
    dispatch,
  ]);

  // Log any error in fetching user cart items
  useMemo(() => {
    if (userCartItemsFetch.isError) {
      console.error(
        `MergeCartItems: error fetching user cart items: ${userCartItemsFetch.error}`
      );
    }
  }, [userCartItemsFetch.isError, userCartItemsFetch.error]);

  // Log any error in adding cart items to database
  useMemo(() => {
    if (addCartItemsRequest.isError) {
      console.error(
        `MergeCartItems: error adding cart items: ${addCartItemsRequest.error}`
      );
    }
  }, [addCartItemsRequest.isError, addCartItemsRequest.error]);

  return null;
};

export default MergeCartItems;
