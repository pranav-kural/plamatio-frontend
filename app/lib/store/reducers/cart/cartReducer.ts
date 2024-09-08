import {RootState} from '@/app/lib/store';
import {CartItem} from '@/app/types/backend-types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// cart state schema
type CartState = {
  cartItems: CartItem[];
};

// initial cart state schema
const INITIAL_CART_STATE: CartState = {
  cartItems: [],
};

// cart slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_CART_STATE,
  reducers: {
    // Add given product (by id) to cart. If product already in cart, increment quantity.
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      // initial cart items
      const cartItems = state.cartItems;
      const cartItemToAdd = action.payload;
      // find if product being added is already in cart
      const productInCart = cartItems.find(
        (cartItem) => cartItem.productId === cartItemToAdd.productId
      );
      // if product not in cart, add it to cart
      if (!productInCart) {
        state.cartItems = [...cartItems, cartItemToAdd];
      } else {
        // if product already in cart, increment quantity
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.productId === cartItemToAdd.productId
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
      }
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      // initial cart items
      const cartItems = state.cartItems;
      const cartItemToRemove = action.payload;
      // remove product from cart
      state.cartItems = cartItems.filter(
        (cartItem) => cartItem.productId !== cartItemToRemove.productId
      );
    },
    incrementQuantity: (state, action: PayloadAction<CartItem>) => {
      // initial cart items
      const cartItems = state.cartItems;
      const cartItemToAdd = action.payload;
      // find if product being added is already in cart
      const productInCart = state.cartItems.find(
        (cartItem) => cartItem.productId === cartItemToAdd.productId
      );
      // if product not in cart, add it to cart
      if (!productInCart) {
        state.cartItems = [...cartItems, cartItemToAdd];
      } else {
        // if product already in cart, increment quantity
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.productId === cartItemToAdd.productId
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
      }
    },
    decrementQuantity: (state, action: PayloadAction<CartItem>) => {
      // initial cart items
      const cartItems = state.cartItems;
      const cartItemToRemove = action.payload;
      // check if product quantity is 1
      const removeProduct =
        cartItems.find(
          (cartItem) => cartItem.productId === cartItemToRemove.productId
        )?.quantity === 1;
      // if product's current quantity 1, remove the product from cart, else
      // decrement the quantity
      state.cartItems = removeProduct
        ? cartItems.filter(
            (cartItem) => cartItem.productId !== cartItemToRemove.productId
          )
        : cartItems.map((cartItem) =>
            cartItem.productId === cartItemToRemove.productId
              ? {...cartItem, quantity: cartItem.quantity - 1}
              : cartItem
          );
    },
  },
});

// Export selectors
export const selectCartItems = (state: RootState) => state.cart.cartItems;

// Export generated actions
export const {
  addCartItem,
  removeCartItem,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

// Export generated reducer
export default cartSlice.reducer;
