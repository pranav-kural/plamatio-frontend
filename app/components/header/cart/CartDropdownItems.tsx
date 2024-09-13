'use client';
import {useGetProductsQuery} from '@/app/lib/api/products-api-slice';
import Image from 'next/image';
import {useMemo} from 'react';
import {LoadingSpinner} from '@/app/components/ui/LoadingSpinner';
import MutateCartButton from '@/app/components/cart/MutateCartButton';
import Link from 'next/link';
import {useAppSelector} from '@/app/lib/store/storeHooks';
import {selectCartItems} from '@/app/lib/store/reducers/cart/cartReducer';
import {SmileIcon} from 'lucide-react';
import {CartItem} from '@/app/lib/plamatio-backend/types';

export const CartDropdownItems = () => {
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

  function getProductImageURL(cartItem: CartItem, productId: number): string {
    console.log(`Product ID: ${productId}`);
    console.dir(cartItem);
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
      <div className="w-full flex flex-col gap-5 bg-white p-5 rounded-md border">
        <span className="font-[500] text-lg text-violet-950 text-center mb-2">
          Cart Items
        </span>
        {productsFetch.isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <LoadingSpinner label="Loading products..." />
          </div>
        )}
        <div className="w-full flex flex-col gap-5 max-h-[350px] min-w-[300px] overflow-y-auto scroll-smooth">
          {productsFetch.isSuccess &&
            cartItems?.map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-row gap-5 min-w-[350px]">
                <Image
                  src={getProductImageURL(item, item.product_id)}
                  width={100}
                  height={100}
                  alt="product image"
                  className="rounded-lg"
                />
                <div className="w-full flex flex-col gap-4">
                  <span className="font-[500]">
                    {getProductName(item.product_id)}
                  </span>
                  <div className="flex flex-row justify-between">
                    <span className="text-lg">
                      ${getProductPrice(item.product_id)}
                    </span>
                    <MutateCartButton
                      cartItem={item}
                      className="max-w-[120px]"
                      setShowMutateCartButton={() => {}}
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
          className="w-full text-center my-3"
          hidden={!cartItems || cartItems.length <= 0}>
          <Link
            href="/checkout"
            className="p-3 rounded-lg text-violet-800 font-[500] hover:text-violet-900 hover:bg-violet-50">
            Checkout
          </Link>
        </button>
      </div>
    </>
  );
};
