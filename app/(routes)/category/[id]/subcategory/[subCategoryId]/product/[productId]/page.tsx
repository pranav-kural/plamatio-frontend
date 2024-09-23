'use client';

import ErrorFetchingData from '@/app/components/error/ErrorFetchingData';
import {ProductPreview} from '@/app/components/products/ProductPreview';
import {LoadingSpinner} from '@/app/components/ui/LoadingSpinner';
import {useGetProductQuery} from '@/app/lib/api/products-api-slice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import Link from 'next/link';
import {useEffect, useMemo} from 'react';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {Logger} from '@/app/utils/logger/Logger';
import {useUser} from '@clerk/nextjs';

// logger
const logger = new Logger({context: 'ProductPage'});

export default function ProductPage({params}: {params: {productId: string}}) {
  // parse the product ID from the URL
  const productId = parseInt(params.productId, 10);

  // get the product data based on ID
  const {isLoading, isSuccess, isError, error, refetch, data} =
    useGetProductQuery(productId);

  // get user if signed in
  const {user} = useUser();

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (isError) {
      logger.error(
        `${Date.now()} ProductPage: Error fetching product for id: ${productId}`,
        JSON.stringify(error)
      );
    }
  }, [isError, error, productId]);

  // dispatch user event when product page is loaded to record product page load
  useEffect(() => {
    if (user) {
      dispatchUserEvent({
        user_id: user.id,
        event_type: 'page_load',
        core_component: 'product_page',
        description: `Loaded product page for product ${productId}`,
        metadata: {product_id: productId},
      });
    }
  }, [productId, user]);

  const buttonToHomePage: React.ReactNode = (
    <div className="w-1/3 h-12 mx-auto bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer text-white rounded-md">
      <Link
        href="/"
        className="w-full h-full flex items-center justify-center"
        onClick={() => {
          if (user) {
            dispatchUserEvent({
              user_id: user.id,
              event_type: 'click',
              core_component: 'product_page',
              description: `User clicked button to view other products. Likely product not found for id: ${productId}`,
              metadata: {product_id: productId},
            });
          }
        }}>
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
          refetchMethod={refetch}>
          {(error as FetchBaseQueryError)?.status === 404 && buttonToHomePage}
        </ErrorFetchingData>
      )}
      {isSuccess && data && (
        <div className="w-full flex flex-col align-middle justify-center">
          <ProductPreview product={data} />
        </div>
      )}
    </>
  );
}
