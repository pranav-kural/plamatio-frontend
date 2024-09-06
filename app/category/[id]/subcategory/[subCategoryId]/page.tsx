'use client';

import ErrorFetchingData from '@/app/components/error/errorFetchingData';
import ProductsShowcase from '@/app/components/products/productsShowcase';
import {LoadingSpinner} from '@/app/components/ui/loading-spinner';
import {useGetProductsBySubCategoryQuery} from '@/app/lib/features/api/products-api-slice';
import {redirect} from 'next/navigation';
import {useMemo} from 'react';

export default function SubCategoryPage({
  params,
}: {
  params: {subCategoryId: string};
}) {
  try {
    // parse the sub-category ID from the URL
    const subCategoryId = parseInt(params.subCategoryId, 10);

    // get products for the sub-category
    const {isLoading, isSuccess, isError, error, refetch, data} =
      useGetProductsBySubCategoryQuery(subCategoryId);

    // Log error if any occurs during fetching data
    useMemo(() => {
      if (isError) {
        console.error(
          `${Date.now()} SubCategoryPage: Error fetching products for sub-category ${subCategoryId}`,
          error
        );
      }
    }, [isError, error]);

    return (
      <>
        {isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <LoadingSpinner label="Loading products..." />
          </div>
        )}
        {isError && <ErrorFetchingData refetchMethod={refetch} />}
        {isSuccess && data && (
          <div className="w-full flex flex-col align-middle justify-center">
            <ProductsShowcase products={data.data} className="px-3" />
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error(error);
    redirect('/');
  }
}
