'use client';
import {useMemo} from 'react';
import ProductsShowcase from '../products/productsShowcase';
import {useGetHeroProductsQuery} from '@/app/lib/features/api/products-api-slice';
import {LoadingSpinner} from '../ui/loading-spinner';

export default function LandingPageShowcase() {
  // get hero products
  const heroProducts = useGetHeroProductsQuery();

  // Log error if any occurs during fetching hero products
  useMemo(() => {
    if (heroProducts.isError) {
      console.error(
        `${Date.now()} LandingPageShowcase: Error fetching hero products`,
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
        <ProductsShowcase products={heroProducts.data.data} className="pt-4" />
      )}
    </>
  );
}
