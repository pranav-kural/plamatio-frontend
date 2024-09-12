'use client';
import {CartItem, Product} from '@/app/lib/plamatio-backend/types';
import {FC} from 'react';
import {SmileIcon} from 'lucide-react';
import Link from 'next/link';
import ProductCheckoutPreview from '../products/ProductCheckoutPreview';

type CheckoutCartItemsProps = {
  cartItems: CartItem[];
  products: Product[];
};

export const CheckoutCartItems: FC<CheckoutCartItemsProps> = ({
  cartItems,
  products,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between gap-10 min-w-[300px]">
      {products.map((product) => (
        <ProductCheckoutPreview key={product.id} product={product} />
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
