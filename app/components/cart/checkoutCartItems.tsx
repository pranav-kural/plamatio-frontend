'use client';
import {CartItem, Product} from '@/app/types/backend-types';
import {FC} from 'react';
import {SmileIcon} from 'lucide-react';
import {ProductPreview} from '../products/productPreview';
import Link from 'next/link';

type CheckoutCartItemsProps = {
  cartItems: CartItem[];
  products: Product[];
};

export const CheckoutCartItems: FC<CheckoutCartItemsProps> = ({
  cartItems,
  products,
}) => {
  return (
    <div className="w-full flex flex-col gap-10 max-h-[350px] min-w-[300px]">
      {products.map((product) => (
        <ProductPreview
          key={product.id}
          product={product}
          className="gap-1 pt-0 px-0 md:px-0"
          imageStyleConfig={{
            width: 300,
            minWidth: 100,
            maxWidth: 300,
            maxWidthMD: 300,
            height: 300,
            className: 'min-h-[100px] max-h-[300px] max-w-[300px]',
          }}
          productStyleConfig={{
            nameClassName: 'text-md md:text-xl',
            descriptionClassName: 'text-sm md:text-lg',
            priceClassName: 'text-md md:text-lg',
            previousPriceClass: 'text-md md:text-lg',
            addToCartButtonClassName: 'lg:max-w-[10vw]',
            detailsContainerClassName: 'gap-1 px-0 sm:px-5 lg:px-10',
            priceAddToCartContainerClassName: 'gap-4 lg:mt-5',
          }}
        />
      ))}
      {cartItems && cartItems.length <= 0 && (
        <div className="w-full flex flex-col gap-5 items-center justify-center">
          <span className="text-md">You have nothing here yet :{'('}</span>
          <span className="text-md">
            We know you will find something you love{' '}
            <SmileIcon className="inline" size={20} strokeWidth={1.5} />
          </span>
          <button className="p-3 rounded-lg bg-violet-800 text-white hover:bg-violet-900">
            <Link href="/">Check Products</Link>
          </button>
        </div>
      )}
    </div>
  );
};
