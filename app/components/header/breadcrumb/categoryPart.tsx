'use client';
import {useGetCategoryQuery} from '@/app/lib/features/api/categories-slice';
import {HomeIcon} from 'lucide-react';
import Link from 'next/link';
import {FC, useMemo} from 'react';

type BreadcrumbCategoryPartProps = {
  categoryId: number;
};

export const BreadcrumbCategoryPart: FC<BreadcrumbCategoryPartProps> = ({
  categoryId,
}) => {
  // fetch data
  const categoryFetch = useGetCategoryQuery(categoryId);

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

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (categoryFetch?.isError) {
      console.error(`${Date.now()} Breadcrumb: Error fetching data.`);
    }
  }, [categoryFetch?.isError]);

  return <>{categoryFetch?.isSuccess && <>{getCategoriesPart}</>}</>;
};

export default BreadcrumbCategoryPart;
