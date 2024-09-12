'use client';

import ErrorFetchingData from '@/app/components/error/ErrorFetchingData';
import ProductsShowcase from '@/app/components/products/ProductsShowcase';
import {LoadingSpinner} from '@/app/components/ui/LoadingSpinner';
import {useGetProductsBySubCategoryQuery} from '@/app/lib/api/products-api-slice';
import {useMemo} from 'react';

export default function SubCategoryPage({
  params,
}: {
  params: {subCategoryId: string};
}) {
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
  }, [isError, error, subCategoryId]);

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
}
