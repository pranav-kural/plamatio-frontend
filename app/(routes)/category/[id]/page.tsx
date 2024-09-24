'use client';
import ErrorFetchingData from '@/app/components/error/ErrorFetchingData';
import ProductsShowcase from '@/app/components/products/ProductsShowcase';
import {LoadingSpinner} from '@/app/components/ui/LoadingSpinner';
import {useGetHeroProductsByCategoryQuery} from '@/app/lib/api/products-api-slice';
import {useEffect, useMemo} from 'react';
import {Logger} from '@/app/utils/logger/Logger';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {useUser} from '@clerk/nextjs';

// logger
const logger = new Logger({context: 'CategoryPage'});

export default function CategoryPage({params}: {params: {id: string}}) {
  // parse the category ID from the URL
  const categoryId = parseInt(params.id, 10);
  // get user if signed in
  const {user} = useUser();

  // hero products
  const {isLoading, isSuccess, isError, error, refetch, data} =
    useGetHeroProductsByCategoryQuery(categoryId);

  // Log error if any occurs during fetching hero products
  useMemo(() => {
    if (isError) {
      logger.error(
        `${Date.now()} CategoryPage: Error fetching hero products for category ${categoryId}`,
        JSON.stringify(error)
      );
    }
  }, [isError, error, categoryId]);

  // Record category page load event for user
  useEffect(() => {
    if (user) {
      dispatchUserEvent({
        user_id: user.id,
        event_type: 'page_load',
        core_component: 'category_page',
        description: `Loaded category page for category ${categoryId}, user ${user.id}`,
        metadata: {category_id: categoryId},
      });
    }
  }, [categoryId, user]);

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
}
