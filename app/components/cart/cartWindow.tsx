'use client';
import {useGetProductsQuery} from '@/app/lib/features/api/products-api-slice';
import useCartHooks from '@/app/lib/hooks/useCartHooks';
import useLocalCartHooks from '@/app/lib/hooks/useLocalCartHooks';
import {CartItemsCollection} from '@/app/lib/plamatio-backend/types';
import Image from 'next/image';
import {useEffect, useMemo, useState} from 'react';
import {LoadingSpinner} from '../ui/loading-spinner';
import MutateCartButton from './mutateCartButton';
import Link from 'next/link';

export const CartWindow = () => {
  const userId: string | undefined = undefined;
  const [cartItems, setCartItems] = useState<CartItemsCollection>();
  const localCart = useLocalCartHooks();
  const userCart = useCartHooks();

  const productsFetch = useGetProductsQuery();

  useEffect(() => {
    if (!userId) {
      setCartItems(localCart.getCartItemsFromLocalStorage());
    } else {
      setCartItems(userCart.getCartItems(userId));
    }
  }, [userId]);

  // Log error if any occurs during fetching  products
  useMemo(() => {
    if (productsFetch.isError) {
      console.error(
        `${Date.now()} CartWindow: Error fetching products for cart items`,
        productsFetch.error
      );
    }
  }, [productsFetch.isError, productsFetch.error]);

  function getProductName(productId: number): string {
    const product = productsFetch.data?.data.find(
      (item) => item.id === productId
    );
    if (product) {
      return product.name;
    }
    throw new Error('Product not found');
  }

  function getProductPrice(productId: number): number {
    const product = productsFetch.data?.data.find(
      (item) => item.id === productId
    );
    if (product) {
      return product.price;
    }
    throw new Error('Product not found');
  }

  function getProductImageURL(productId: number): string {
    const product = productsFetch.data?.data.find(
      (item) => item.id === productId
    );
    if (product) {
      return product.imageUrl;
    }
    throw new Error('Product not found');
  }

  // method to handle removal from cart of a product
  const handleRemovalFromCart = () => {
    // re-fetch cart items
    if (!userId) {
      setCartItems(localCart.getCartItemsFromLocalStorage());
    } else {
      setCartItems(userCart.getCartItems(userId));
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5 bg-white shadow-lg shadow-mauve8 p-5 rounded-md border">
        <span className="font-semibold text-lg text-center">Cart Items</span>
        {productsFetch.isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <LoadingSpinner label="Loading products..." />
          </div>
        )}
        <div className="w-full flex flex-col gap-5 max-h-[350px] overflow-y-scroll scroll-smooth">
          {productsFetch.isSuccess &&
            cartItems?.data.map((item) => (
              <div className="w-full flex flex-row gap-5 min-w-[350px]">
                <Image
                  src={getProductImageURL(item.productId)}
                  width={100}
                  height={100}
                  alt="product image"
                  className="rounded-lg"
                />
                <div className="w-full flex flex-col gap-2">
                  <span className="font-semibold">
                    {getProductName(item.productId)}
                  </span>
                  <div className="flex flex-row justify-between">
                    <span className="text-lg">
                      ${getProductPrice(item.productId)}
                    </span>
                    <MutateCartButton
                      cartItem={item}
                      handleRemovalFromCart={handleRemovalFromCart}
                      className="max-w-[100px]"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="w-full text-center">
          <Link
            href="/checkout"
            className="p-3 rounded-lg bg-violet-700 text-white hover:bg-violet-800">
            Go to Checkout
          </Link>
        </div>
      </div>
    </>
  );
};
