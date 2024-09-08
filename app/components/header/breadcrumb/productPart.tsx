'use client';
import {useGetProductQuery} from '@/app/lib/api/products-api-slice';
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
            className="cursor-pointer">
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
