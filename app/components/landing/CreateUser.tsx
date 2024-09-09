import {useAddCartItemMutation} from '@/app/lib/api/cart-items-slice';
import {useAddUserMutation, useGetUserQuery} from '@/app/lib/api/users-slice';
import {User} from '@/app/types/backend-types';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {FC, useMemo} from 'react';

type CreateUserProps = {
  user: User;
};

export const CreateUser: FC<CreateUserProps> = ({user}) => {
  const userFetch = useGetUserQuery(user.id);
  const [addUser, addUserRequest] = useAddUserMutation();
  const [addCartItem, addCartItemRequest] = useAddCartItemMutation();

  // Add new user to database if no user data found for the current signed in or signed up user
  useMemo(async () => {
    if (
      userFetch.isSuccess ||
      (userFetch.isError &&
        (userFetch.error as FetchBaseQueryError).status === 404)
    ) {
      console.log('CreateUser: User fetch success or user not found');
      // if no user data found for the current user
      if (!userFetch.data) {
        console.log('CreateUser: Adding user');
        // add user to database
        const userToAdd: User = {
          id: user.id,
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          email: user.email,
        };
        console.dir(userToAdd);
        try {
          const payload = await addUser(userToAdd).unwrap();
          console.log('fulfilled', payload);
        } catch (error) {
          console.error('rejected', error);
        }
      } else {
        console.log('CreateUser: User found');
        console.dir(userFetch.data);
      }
    }
  }, [
    userFetch.isSuccess,
    userFetch.data,
    userFetch.error,
    userFetch.isError,
    user,
    addUser,
  ]);

  // add cart items once user and sign up complete
  useMemo(() => {
    // once sign up completes
    if (userFetch.isSuccess && addUserRequest.isSuccess) {
      console.log('CreateUser: User fetch success and user added');

      // get cart items from local storage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

      // if user id available and cart items are available in local storage
      if (user && cartItems?.length > 0) {
        // for each cart item
        for (const cartItem of cartItems) {
          console.log('CreateUser: Adding cart item', cartItem);
          // add cart item with user id
          addCartItem({
            userId: user.id,
            productId: cartItem.productId,
            quantity: cartItem.quantity,
          });
        }
        // Clear local storage
        localStorage.removeItem('cartItems');
      }
    }
  }, [userFetch.isSuccess, addUserRequest.isSuccess, addCartItem, user]);

  // log error if any occurs during adding user
  useMemo(() => {
    if (addUserRequest.isError) {
      console.error(
        `${Date.now()} CreateUser: Error adding user`,
        addUserRequest.error
      );
    }
  }, [addUserRequest.isError, addUserRequest.error]);

  // log error if any occurs during adding cart items
  useMemo(() => {
    if (addCartItemRequest.isError) {
      console.error(
        `${Date.now()} CreateUser: Error adding cart items`,
        addCartItemRequest.error
      );
    }
  }, [addCartItemRequest.isError, addCartItemRequest.error]);

  return null;
};
