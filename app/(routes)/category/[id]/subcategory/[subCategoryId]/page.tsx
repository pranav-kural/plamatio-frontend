'use client';

import ErrorFetchingData from '@/app/components/error/ErrorFetchingData';
import ProductsShowcase from '@/app/components/products/ProductsShowcase';
import {LoadingSpinner} from '@/app/components/ui/LoadingSpinner';
import {useGetProductsBySubCategoryQuery} from '@/app/lib/api/products-api-slice';
import {useEffect, useMemo} from 'react';
import {Logger} from '@/app/utils/logger/Logger';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {useUser} from '@clerk/nextjs';

// logger
const logger = new Logger({context: 'SubCategoryPage'});

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

  // get user if signed in
  const {user} = useUser();

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (isError) {
      logger.error(
        `${Date.now()} SubCategoryPage: Error fetching products for sub-category ${subCategoryId}`,
        JSON.stringify(error)
      );
    }
  }, [isError, error, subCategoryId]);

  // dispatch user event when sub-category page is loaded to record product page load
  useEffect(() => {
    if (user) {
      dispatchUserEvent({
        user_id: user.id,
        event_type: 'page_load',
        core_component: 'sub_category_page',
        description: `Loaded sub-category page for sub-category ${subCategoryId}`,
        metadata: {sub_category_id: subCategoryId},
      });
    }
  }, [subCategoryId, user]);

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
