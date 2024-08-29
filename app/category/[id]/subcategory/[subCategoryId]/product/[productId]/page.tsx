'use server';

import {SAMPLE_DATA} from '@/app/(data)/sample-data';
import {ProductPreview} from '@/app/components/products/productPreview';
import {redirect} from 'next/navigation';

export default async function ProductPage({
  params,
}: {
  params: {productId: string};
}) {
  try {
    // parse the product ID from the URL
    const productId = parseInt(params.productId, 10);

    // get the product data based on ID
    const productData = SAMPLE_DATA.products.find(
      (product) => product.id === productId
    );

    if (!productData) {
      throw new Error('product not found');
    }

    return (
      <div className="w-full flex flex-col align-middle justify-center">
        <ProductPreview product={productData} />
      </div>
    );
  } catch (error) {
    console.error(error);
    redirect('/');
  }
}
