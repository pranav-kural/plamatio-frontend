'use client';
import {useEffect, useMemo, useState} from 'react';
import {selectCartItems} from '@/app/lib/store/reducers/cart/cartReducer';
import {useAppSelector} from '@/app/lib/store/storeHooks';
import {CheckoutCartItems} from '@/app/components/cart/checkoutCartItems';
import {Raleway} from 'next/font/google';
import {useGetProductsQuery} from '@/app/lib/api/products-api-slice';
import {Product} from '@/app/types/backend-types';
import OrderSection from '@/app/components/checkout/OrderSection';
import {LoadingSpinner} from '../components/ui/loading-spinner';
import UserDetailsSection from '../components/checkout/UserDetailsSection';
import AddressesSection from '../components/checkout/AddressesSection';

const raleway = Raleway({weight: '500', subsets: ['latin']});

export default function CheckoutPage() {
  // get cart items
  const cartItems = useAppSelector(selectCartItems);

  const productsFetch = useGetProductsQuery();
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  // Log error if any occurs during fetching  products
  useMemo(() => {
    if (productsFetch.isError) {
      console.error(
        `${Date.now()} CartWindow: Error fetching products for cart items`,
        productsFetch.error
      );
    }
  }, [productsFetch.isError, productsFetch.error]);

  useEffect(() => {
    if (productsFetch.isSuccess) {
      const products = productsFetch.data?.data.filter((product) =>
        cartItems.map((item) => item.productId).includes(product.id)
      );
      if (products) {
        setProductsInCart(products);
      }
    }
  }, [productsFetch.isSuccess, cartItems, productsFetch.data?.data]);

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
              {cartItems.length < 3 && (
                <div className="mt-5 w-full flex flex-row gap-5">
                  <UserDetailsSection />
                  <AddressesSection />
                </div>
              )}
            </div>
            <div className="md:w-[25%] md:min-w-[25%] flex flex-col gap-5">
              {cartItems.length >= 3 && (
                <>
                  <UserDetailsSection />
                  <AddressesSection />
                </>
              )}

              <OrderSection cartItems={cartItems} products={productsInCart} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
