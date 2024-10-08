'use client';
import {useEffect, useMemo, useState} from 'react';
import {selectCartItems} from '@/app/lib/store/reducers/cart/cartReducer';
import {useAppSelector} from '@/app/lib/store/storeHooks';
import {CheckoutCartItems} from '@/app/components/cart/CheckoutCartItems';
import {Raleway} from 'next/font/google';
import {useGetProductsQuery} from '@/app/lib/api/products-api-slice';
import {Product, User} from '@/app/lib/plamatio-backend/types';
import {LoadingSpinner} from '@/app/components/ui/LoadingSpinner';
import UserDetailsSection from '@/app/components/checkout/UserDetailsSection';
import AddressesSection from '@/app/components/checkout/AddressesSection';
import {useUser} from '@clerk/nextjs';
import SignInSignUpButtons from '@/app/components/auth/SigInSignUpButtons';
import CheckoutPaymentModal from '@/app/components/checkout/CheckoutPaymentModal';
import OrderSection from '@/app/components/checkout/OrderSection';
import {Logger} from '@/app/utils/logger/Logger';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';

// logger
const logger = new Logger({context: 'CheckoutPage'});

const raleway = Raleway({weight: '500', subsets: ['latin']});

export default function CheckoutPage() {
  // get user details
  const {isLoaded, isSignedIn, user} = useUser();
  // get cart items
  const cartItems = useAppSelector(selectCartItems);

  const productsFetch = useGetProductsQuery();
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  // store shipping address ID
  const [addressId, setAddressId] = useState<number>(0);

  // track total price
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (productsFetch.isError) {
      logger.error(
        `${Date.now()} CartWindow: Error fetching products for cart items`,
        JSON.stringify(productsFetch.error)
      );
    }
  }, [productsFetch.isError, productsFetch.error]);

  useEffect(() => {
    if (productsFetch.isSuccess) {
      const products = productsFetch.data?.data.filter((product) =>
        cartItems.map((item) => item.product_id).includes(product.id)
      );
      if (products) {
        setProductsInCart(products);
      }
    }
  }, [productsFetch.isSuccess, cartItems, productsFetch.data?.data]);

  // Record checkout page load event for user
  useEffect(() => {
    if (user) {
      dispatchUserEvent({
        user_id: user.id,
        event_type: 'page_load',
        core_component: 'checkout_page',
        description: `Loaded checkout page for user ${user.id}`,
      });
    }
  }, [user]);

  const userObj = useMemo(() => {
    if (user) {
      const u: User = {
        id: user.id,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.emailAddresses[0]?.emailAddress,
      };
      return u;
    }
    return undefined;
  }, [user]);

  return (
    <>
      <div className="w-full max-w-[1720px] h-full flex flex-col gap-5 items-start justify-start px-5 md:px-20 pt-5">
        <h1 className={`text-3xl text-violet-800 ${raleway.className}`}>
          Checkout
        </h1>
        {productsFetch.isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <LoadingSpinner label="Loading products..." />
          </div>
        )}

        {productsFetch.isSuccess && (
          <div className="w-full flex flex-col md:flex-row gap-5 items-start">
            <div className="md:w-[75%] md:min-w-[75%]">
              <CheckoutCartItems
                cartItems={cartItems}
                products={productsInCart}
              />

              {isSignedIn && isLoaded && cartItems.length < 2 && userObj && (
                <div className="mt-5 w-full flex flex-row gap-5">
                  <UserDetailsSection user={userObj} />
                  <AddressesSection
                    userId={user.id}
                    setAddressId={setAddressId}
                  />
                </div>
              )}
            </div>
            <div className="md:w-[25%] md:min-w-[25%] flex flex-col gap-5">
              {!isSignedIn && (
                <div className="w-full flex flex-col gap-5 justify-between p-3 border border-violet-800 rounded-lg shadow-lg">
                  <p className="text-gray-500 text-md">
                    Please Sign In or Sign Up to continue placing your order.
                  </p>
                  <SignInSignUpButtons />
                </div>
              )}

              {isSignedIn && !isLoaded && (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <LoadingSpinner label="Loading user data..." />
                </div>
              )}

              {isSignedIn && isLoaded && cartItems.length >= 2 && userObj && (
                <>
                  <UserDetailsSection user={userObj} />
                  <AddressesSection
                    userId={user.id}
                    setAddressId={setAddressId}
                  />
                </>
              )}

              <OrderSection
                cartItems={cartItems}
                products={productsInCart}
                setTotalPrice={setTotalPrice}
              />
              {isSignedIn && isLoaded && (
                <CheckoutPaymentModal
                  addressId={addressId}
                  userId={user.id}
                  totalPrice={totalPrice}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
