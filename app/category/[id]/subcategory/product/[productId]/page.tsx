'use server';

import {SAMPLE_DATA} from '@/app/(data)/sample-data';
import ProductsShowcase from '@/app/components/products/productsShowcase';
import {redirect} from 'next/navigation';

export default async function ProductPage({
  params,
}: {
  params: {productId: string};
}) {
  try {
    // parse the product ID from the URL
    const productId = parseInt(params.productId, 10);

    return (
      <div className="w-full flex flex-col align-middle justify-center">
        <span>{productId || 'no id'}</span>
      </div>
    );
  } catch (error) {
    console.error(error);
    redirect('/');
  }
}
