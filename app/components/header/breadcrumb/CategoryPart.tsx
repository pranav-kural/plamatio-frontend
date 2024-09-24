'use client';
import {useGetCategoryQuery} from '@/app/lib/api/categories-slice';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {useUser} from '@clerk/nextjs';
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
  // user data for recording events
  const {user} = useUser();

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
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (user) {
                dispatchUserEvent({
                  user_id: user.id,
                  event_type: 'click',
                  core_component: 'breadcrumb',
                  description: `Clicked on category in breadcrumb for category ${categoryFetch.data?.name}`,
                  metadata: {category_id: categoryId},
                });
              }
            }}>
            {categoryFetch.data.name}
          </Link>
        </>
      );
    }

    return null;
  }, [categoryFetch, categoryId, user]);

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (categoryFetch?.isError) {
      console.error(`${Date.now()} Breadcrumb: Error fetching data.`);
    }
  }, [categoryFetch?.isError]);

  return <>{categoryFetch?.isSuccess && <>{getCategoriesPart}</>}</>;
};

export default BreadcrumbCategoryPart;
