'use server';

import {SAMPLE_DATA} from '@/app/(data)/sample-data';
import ProductsShowcase from '@/app/components/products/productsShowcase';
import {redirect} from 'next/navigation';

export default async function SubCategoryPage({
  params,
}: {
  params: {subCategoryId: string};
}) {
  try {
    // parse the sub-category ID from the URL
    const subCategoryId = parseInt(params.subCategoryId, 10);

    // get the sub-category data based on ID
    const subCategoryData = SAMPLE_DATA.subCategoriesMap.get(subCategoryId);

    if (!subCategoryData) {
      throw new Error('sub-category not found');
    }

    // get data for the subcategories
    const products = SAMPLE_DATA.products.filter(
      (product) => product.subCategory === subCategoryId
    );

    return (
      <div className="w-full flex flex-col align-middle justify-center px-1">
        <ProductsShowcase products={products} />
      </div>
    );
  } catch (error) {
    console.error(error);
    redirect('/');
  }
}
