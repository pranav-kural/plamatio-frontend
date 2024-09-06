'use client';

import ErrorFetchingData from '@/app/components/error/errorFetchingData';
import {ProductPreview} from '@/app/components/products/productPreview';
import {LoadingSpinner} from '@/app/components/ui/loading-spinner';
import {useGetProductQuery} from '@/app/lib/features/api/products-api-slice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {useMemo} from 'react';

export default function ProductPage({params}: {params: {productId: string}}) {
  try {
    // parse the product ID from the URL
    const productId = parseInt(params.productId, 10);

    // get the product data based on ID
    const {isLoading, isSuccess, isError, error, refetch, data} =
      useGetProductQuery(productId);

    // Log error if any occurs during fetching data
    useMemo(() => {
      if (isError) {
        console.error(
          `${Date.now()} ProductPage: Error fetching product for id: ${productId}`,
          error
        );
      }
    }, [isError, error]);

    const buttonToHomePage: React.ReactNode = (
      <div className="w-1/3 h-12 mx-auto bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer text-white rounded-md">
        <Link
          href="/"
          className="w-full h-full flex items-center justify-center">
          <span className="text-lg">Check Other Products</span>
        </Link>
      </div>
    );

    return (
      <>
        {isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <LoadingSpinner label="Loading product details..." />
          </div>
        )}
        {isError && (
          <ErrorFetchingData
            message={
              (error as FetchBaseQueryError)?.status === 404
                ? "Oops! Couldn't find what you're looking for, but feel free to browse our collection."
                : undefined
            }
            refetchMethod={refetch}
            children={
              (error as FetchBaseQueryError)?.status === 404 && buttonToHomePage
            }
          />
        )}
        {isSuccess && data && (
          <div className="w-full flex flex-col align-middle justify-center">
            <ProductPreview product={data} />
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error(error);
    redirect('/');
  }
}
