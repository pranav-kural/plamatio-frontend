import {CartItemsCollection} from '../plamatio-backend/types';

export const useCartHooks = () => {
  function getCartItems(userId: string): CartItemsCollection {
    console.log(userId);
    return {data: []};
  }

  return {
    getCartItems,
  };
};

export default useCartHooks;
