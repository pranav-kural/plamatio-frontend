'use client';
import {useGetSubCategoryQuery} from '@/app/lib/features/api/categories-slice';
import Link from 'next/link';
import {FC, useMemo} from 'react';

type BreadcrumbSubCategortPartProps = {
  categoryId: number;
  subCategoryId: number;
};

export const BreadcrumbSubCategortPart: FC<BreadcrumbSubCategortPartProps> = ({
  categoryId,
  subCategoryId,
}) => {
  const subCategoryFetch = useGetSubCategoryQuery(subCategoryId);

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

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (subCategoryFetch?.isError) {
      console.error(`${Date.now()} Breadcrumb: Error fetching data.`);
    }
  }, [subCategoryFetch?.isError]);

  return <>{subCategoryFetch?.isSuccess && <>{getSubCategoriesPart}</>}</>;
};

export default BreadcrumbSubCategortPart;
