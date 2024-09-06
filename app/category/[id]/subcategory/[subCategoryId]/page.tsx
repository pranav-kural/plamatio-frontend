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
    const subCategoryData = SAMPLE_DATA.subCategories.find((subCategory) => {
      return subCategory.id === subCategoryId;
    });

    if (!subCategoryData) {
      throw new Error('sub-category not found');
    }

    // get data for the subcategories
    const products = SAMPLE_DATA.products.filter(
      (product) => product.subCategoryId === subCategoryId
    );

    return (
      <div className="w-full flex flex-col align-middle justify-center">
        <ProductsShowcase products={products} className="px-3" />
      </div>
    );
  } catch (error) {
    console.error(error);
    redirect('/');
  }
}
