'use client';
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
    const heroProducts = useGetHeroProductsByCategoryQuery(categoryId);

    // Log error if any occurs during fetching hero products
    useMemo(() => {
      if (heroProducts.isError) {
        console.error(
          `${Date.now()} CategoryPage: Error fetching hero products for category ${categoryId}`,
          heroProducts.error
        );
      }
    }, [heroProducts.isError, heroProducts.error]);

    return (
      <>
        {heroProducts.isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <LoadingSpinner label="Loading products..." />
          </div>
        )}
        {heroProducts.isError && (
          <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
            <span className="max-w-[500px] text-2xl text-center">
              Error fetching products. Please ensure you are connected to the
              internet. If the problem persists, contact support.
            </span>
            <button
              className="w-1/3 h-12 mx-auto bg-violet-700 text-white rounded-md"
              onClick={() => heroProducts.refetch()}>
              Retry
            </button>
          </div>
        )}
        {heroProducts.isSuccess && (
          <ProductsShowcase
            products={heroProducts.data.data}
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
