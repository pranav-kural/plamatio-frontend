'use client';
import {useGetSubCategoryQuery} from '@/app/lib/api/categories-slice';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {useUser} from '@clerk/nextjs';
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
  // user data for recording events
  const {user} = useUser();

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
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (user) {
                dispatchUserEvent({
                  user_id: user.id,
                  event_type: 'click',
                  core_component: 'breadcrumb',
                  description: `Clicked on subcategory in breadcrumb for subcategory ${subCategoryFetch.data?.name}`,
                  metadata: {subcategory_id: subCategoryId},
                });
              }
            }}>
            {subCategoryFetch.data.name}
          </Link>
        </>
      );
    }

    return null;
  }, [subCategoryFetch, categoryId, subCategoryId, user]);

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (subCategoryFetch?.isError) {
      console.error(`${Date.now()} Breadcrumb: Error fetching data.`);
    }
  }, [subCategoryFetch?.isError]);

  return <>{subCategoryFetch?.isSuccess && <>{getSubCategoriesPart}</>}</>;
};

export default BreadcrumbSubCategortPart;
