'use client';
import ErrorFetchingData from '@/app/components/error/errorFetchingData';
import ProductsShowcase from '@/app/components/products/productsShowcase';
import {LoadingSpinner} from '@/app/components/ui/loading-spinner';
import {useGetHeroProductsByCategoryQuery} from '@/app/lib/features/api/products-api-slice';
import {redirect} from 'next/navigation';
import {useMemo} from 'react';

export default function CategoryPage({params}: {params: {id: string}}) {
  try {
    // parse the category ID from the URL
    const categoryId = parseInt(params.id, 10);

    // hero products
    const {isLoading, isSuccess, isError, error, refetch, data} =
      useGetHeroProductsByCategoryQuery(categoryId);

    // Log error if any occurs during fetching hero products
    useMemo(() => {
      if (isError) {
        console.error(
          `${Date.now()} CategoryPage: Error fetching hero products for category ${categoryId}`,
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
        {isSuccess && (
          <ProductsShowcase
            products={data.data}
            categoryId={categoryId}
            showSubcategories
            className="px-5"
          />
        )}
      </>
    );
  } catch (error) {
    console.error(error);
    redirect('/');
  }
}
