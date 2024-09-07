import {CartItem} from '@/app/types/backend-types';
import {LOCAL_STORAGE_KEYS} from '../localStorage';
import {CartItemsCollection} from '../plamatio-backend/types';

export const useLocalCartHooks = () => {
  function addProductToCartItemsLocalStorage(productId: number): CartItem {
    // confirm window available
    if (typeof window !== 'undefined') {
      // check local storage for cart items
      const cartItemsData = localStorage.getItem(LOCAL_STORAGE_KEYS.CART_ITEMS);
      // prepare data
      const cartItemToAdd: CartItem = {
        productId: productId,
        quantity: 1,
        id: Math.floor(Math.random() * 1000), // id specific to local storage
        userId: 0, // not relevant for local storage
      };
      // check if cart items available
      if (cartItemsData) {
        // parse the cart items
        const cartItems = JSON.parse(cartItemsData) as CartItemsCollection;
        // get the cart item matching the product id or the product provided in props
        const cartItem = cartItems?.data?.find(
          (item: CartItem) => item.productId === productId
        );
        // if cart item already available, update the quantity
        if (cartItem) {
          cartItem.quantity += 1;
          // update the cart items
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.CART_ITEMS,
            JSON.stringify(cartItems)
          );

          // return the updated cart item
          return cartItem;
        } else {
          // add new cart item
          cartItems.data.push(cartItemToAdd);
          // update the cart items
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.CART_ITEMS,
            JSON.stringify(cartItems)
          );

          // return the new cart item
          return cartItemToAdd;
        }
      } else {
        const newCartCollection: CartItemsCollection = {
          data: [cartItemToAdd],
        };
        // if cart items not available, add new cart item
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.CART_ITEMS,
          JSON.stringify(newCartCollection)
        );

        // return the new cart item
        return cartItemToAdd;
      }
    } else {
      // if no window available
      throw new Error('addProductToCartItemsLocalStorage: No window available');
    }
  }

  function incrementLocalQuantity(cartItem: CartItem): CartItem {
    // confirm window available
    if (typeof window !== 'undefined') {
      // check local storage for cart items
      const cartItemsData = localStorage.getItem(LOCAL_STORAGE_KEYS.CART_ITEMS);
      // check if cart items available
      if (cartItemsData) {
        // parse the cart items
        const cartItems = JSON.parse(cartItemsData) as CartItemsCollection;
        // get the cart item matching the product id or the product provided in props
        const cartItemToUpdate = cartItems?.data?.find(
          (item: CartItem) => item.id === cartItem.id
        );
        // if cart item available, update the quantity
        if (cartItemToUpdate) {
          cartItemToUpdate.quantity += 1;
          // update the cart items
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.CART_ITEMS,
            JSON.stringify(cartItems)
          );

          // return the updated cart item
          return cartItemToUpdate;
        } else {
          // if cart item not available, throw error
          throw new Error(
            `incrementLocalQuantity: Cart item not found in local storage for id ${cartItem.id}`
          );
        }
      } else {
        // if cart items not available, throw error
        throw new Error(
          'incrementLocalQuantity: Cart items not found in local storage'
        );
      }
    } else {
      // if no window available
      throw new Error('incrementLocalQuantity: No window available');
    }
  }

  function decrementLocalQuantity(cartItem: CartItem): CartItem {
    // confirm window available
    if (typeof window !== 'undefined') {
      // check local storage for cart items
      const cartItemsData = localStorage.getItem(LOCAL_STORAGE_KEYS.CART_ITEMS);
      // check if cart items available
      if (cartItemsData) {
        // parse the cart items
        const cartItems = JSON.parse(cartItemsData) as CartItemsCollection;
        // get the cart item matching the product id or the product provided in props
        const cartItemToUpdate = cartItems?.data?.find(
          (item: CartItem) => item.id === cartItem.id
        );
        // if cart item available, update the quantity
        if (cartItemToUpdate) {
          cartItemToUpdate.quantity -= 1;
          // if quantity is 0, remove the cart item
          if (cartItemToUpdate.quantity === 0) {
            // remove the cart item
            cartItems.data = cartItems.data.filter(
              (item: CartItem) => item.id !== cartItem.id
            );
          }
          // update the cart items
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.CART_ITEMS,
            JSON.stringify(cartItems)
          );
          // return the updated cart item
          return cartItemToUpdate;
        } else {
          // if cart item not available, throw error
          throw new Error(
            `decrementLocalQuantity: Cart item not found in local storage for id ${cartItem.id}`
          );
        }
      } else {
        // if cart items not available, throw error
        throw new Error(
          'decrementLocalQuantity: Cart items not found in local storage'
        );
      }
    } else {
      // if no window available
      throw new Error('decrementLocalQuantity: No window available');
    }
  }

  return {
    addProductToCartItemsLocalStorage,
    incrementLocalQuantity,
    decrementLocalQuantity,
  };
};

export default useLocalCartHooks;
