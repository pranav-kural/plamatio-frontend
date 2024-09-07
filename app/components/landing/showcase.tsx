'use client';
import {useMemo} from 'react';
import ProductsShowcase from '../products/productsShowcase';
import {useGetHeroProductsQuery} from '@/app/lib/features/api/products-api-slice';
import {LoadingSpinner} from '../ui/loading-spinner';
import ErrorFetchingData from '../error/errorFetchingData';

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
        <ErrorFetchingData refetchMethod={heroProducts.refetch} />
      )}
      {heroProducts.isSuccess && (
        <ProductsShowcase products={heroProducts.data.data} className="pt-4" />
      )}
    </>
  );
}
