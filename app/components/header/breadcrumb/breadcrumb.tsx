'use client';
import {
  useGetCategoryQuery,
  useGetSubCategoryQuery,
} from '@/app/lib/features/api/categories-slice';
import {useGetProductQuery} from '@/app/lib/features/api/products-api-slice';
import {HomeIcon} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {FC, useMemo} from 'react';

type BreadcrumbProps = {
  hidden?: boolean;
  url?: string;
};

export const Breadcrumb: FC<BreadcrumbProps> = ({url, hidden}) => {
  // get the current URL path unless a URL is provided
  const pathname = usePathname();
  if (!url) {
    url = pathname;
  }

  const parts = url.split('/');
  const categoryIndex = parts.indexOf('category');
  const subCategoryIndex = parts.indexOf('subcategory');
  const productIndex = parts.indexOf('product');

  const categoryId =
    categoryIndex !== -1 && parts[categoryIndex + 1]
      ? parseInt(parts[categoryIndex + 1])
      : null;
  const subCategoryId =
    subCategoryIndex !== -1 && parts[subCategoryIndex + 1]
      ? parseInt(parts[subCategoryIndex + 1])
      : null;
  const productId =
    productIndex !== -1 && parts[productIndex + 1]
      ? parseInt(parts[productIndex + 1])
      : null;

  // fetch data
  const categoryFetch = useGetCategoryQuery(categoryId || -1);
  const subCategoryFetch = useGetSubCategoryQuery(subCategoryId || -1);
  const productFetch = useGetProductQuery(productId || -1);

  // Method to get the categories part of the breadcrumb
  const getCategoriesPart = useMemo(() => {
    if (categoryFetch && categoryFetch.data) {
      return (
        <>
          <Link key="home" href="/" className="cursor-pointer">
            <HomeIcon className="inline mb-1" size={18} strokeWidth={1.5} />
          </Link>
          <span key="separator0" className="mx-2">
            {'>'}
          </span>
          <Link
            key="category"
            href={`/category/${categoryId}`}
            className="cursor-pointer">
            {categoryFetch.data.name}
          </Link>
        </>
      );
    }

    return null;
  }, [categoryFetch, categoryId]);

  // Method to get the subcategories part of the breadcrumb
  const getSubCategoriesPart = useMemo(() => {
    if (subCategoryFetch && subCategoryFetch.data) {
      return (
        <>
          <span key="separator1" className="mx-2">
            {'>'}
          </span>
          <Link
            key="subcategory"
            href={`/category/${categoryId}/subcategory/${subCategoryId}`}
            className="cursor-pointer">
            {subCategoryFetch.data.name}
          </Link>
        </>
      );
    }

    return null;
  }, [subCategoryFetch, categoryId, subCategoryId]);

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
    if (
      categoryFetch?.isError ||
      subCategoryFetch?.isError ||
      productFetch?.isError
    ) {
      console.error(`${Date.now()} Breadcrumb: Error fetching data.`);
    }
  }, [
    categoryFetch?.isError,
    subCategoryFetch?.isError,
    productFetch?.isError,
  ]);

  return (
    <>
      {categoryFetch?.isSuccess &&
        subCategoryFetch?.isSuccess &&
        productFetch?.isSuccess && (
          <div className="px-1 sm:px-2 md:px-5 z-10">
            <div
              className={`${hidden ? 'hidden' : ''} text-sm text-violet-900`}>
              {getCategoriesPart}
              {getSubCategoriesPart}
              {getProductsPart}
            </div>
          </div>
        )}
    </>
  );
};
