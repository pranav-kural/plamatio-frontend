'use client';
import {useGetProductsQuery} from '@/app/lib/api/products-api-slice';
import Image from 'next/image';
import {useMemo} from 'react';
import {LoadingSpinner} from '../ui/loading-spinner';
import MutateCartButton from './mutateCartButton';
import Link from 'next/link';
import {useAppSelector} from '@/app/lib/store/storeHooks';
import {selectCartItems} from '@/app/lib/store/reducers/cart/cartReducer';
import {SmileIcon} from 'lucide-react';

export const CartWindow = () => {
  // const userId: string | undefined = undefined;
  const cartItems = useAppSelector(selectCartItems);

  const productsFetch = useGetProductsQuery();

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

  return (
    <>
      <div className="w-full flex flex-col gap-5 bg-white shadow-lg shadow-mauve8 p-5 rounded-md border">
        <span className="font-semibold text-lg text-center">Cart Items</span>
        {productsFetch.isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <LoadingSpinner label="Loading products..." />
          </div>
        )}
        <div className="w-full flex flex-col gap-5 max-h-[350px] min-w-[300px] overflow-y-scroll scroll-smooth">
          {productsFetch.isSuccess &&
            cartItems?.map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-row gap-5 min-w-[350px]">
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
                      className="max-w-[100px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          {cartItems && cartItems.length <= 0 && (
            <div className="w-full flex flex-col gap-5 items-center justify-center">
              <span className="text-md">You have nothing here yet :{'('}</span>
              <span className="text-md">
                We know you will find something you love{' '}
                <SmileIcon className="inline" size={20} strokeWidth={1.5} />
              </span>
            </div>
          )}
        </div>
        <button
          className="w-full text-center"
          hidden={!cartItems || cartItems.length <= 0}>
          <Link
            href="/checkout"
            className="p-3 rounded-lg bg-violet-700 text-white hover:bg-violet-800">
            Go to Checkout
          </Link>
        </button>
      </div>
    </>
  );
};
