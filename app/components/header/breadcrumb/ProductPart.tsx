'use client';
import {useGetProductQuery} from '@/app/lib/api/products-api-slice';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {useUser} from '@clerk/nextjs';
import Link from 'next/link';
import {FC, useMemo} from 'react';

type BreadcrumbProductPartProps = {
  categoryId: number;
  subCategoryId: number;
  productId: number;
};

export const BreadcrumbProductPart: FC<BreadcrumbProductPartProps> = ({
  categoryId,
  subCategoryId,
  productId,
}) => {
  // fetch data
  const productFetch = useGetProductQuery(productId);
  // user data for recording events
  const {user} = useUser();

  // Method to get the products part of the breadcrumb
  const getProductsPart = useMemo(() => {
    if (productFetch && productFetch.data) {
      return (
        <>
          <span key="separator2" className="mx-2">
            {'>'}
          </span>
          <Link
            key="product"
            href={`/category/${categoryId}/subcategory/${subCategoryId}/product/${productId}`}
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (user) {
                dispatchUserEvent({
                  user_id: user.id,
                  event_type: 'click',
                  core_component: 'breadcrumb',
                  description: `Clicked on product in breadcrumb for product ${productFetch.data?.name}`,
                  metadata: {product_id: productId},
                });
              }
            }}>
            {productFetch.data.name}
          </Link>
        </>
      );
    }

    return null;
  }, [productFetch, categoryId, subCategoryId, productId]);

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (productFetch?.isError) {
      console.error(`${Date.now()} Breadcrumb: Error fetching data.`);
    }
  }, [productFetch?.isError]);

  return <>{productFetch?.isSuccess && <>{getProductsPart}</>}</>;
};

export default BreadcrumbProductPart;
