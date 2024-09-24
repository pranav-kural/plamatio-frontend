'use client';
import {Product} from '@/app/lib/plamatio-backend/types';
import {ProductTile} from './ProductTile';
import classNames from 'classnames';
import {FC, useMemo} from 'react';
import Link from 'next/link';
import {Gayathri} from 'next/font/google';
import {useGetSubCategoriesByCategoryQuery} from '@/app/lib/api/categories-slice';
import {LoadingSpinner} from '../ui/LoadingSpinner';
import ErrorFetchingData from '../error/ErrorFetchingData';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {useUser} from '@clerk/nextjs';

const gayathri = Gayathri({weight: '400', subsets: ['latin']});

type ProductsShowcaseProps = {
  products: Product[];
  className?: string;
  tileClassName?: string;
  categoryId?: number;
};

export const ProductsShowcaseWithSubcategories: FC<ProductsShowcaseProps> = (
  props: ProductsShowcaseProps
) => {
  const categoryId = props.categoryId;

  // get user if signed in
  const {user} = useUser();

  // if showing subcategories
  if (!categoryId || categoryId <= 0) {
    console.error(
      'ProductsShowcaseWithSubcategories: categoryId is required. Will show products without subcategories by default.'
    );
  }

  // get data for the subcategories
  const subCategories = useGetSubCategoriesByCategoryQuery(categoryId || -1);

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (subCategories && subCategories.isError) {
      console.error(
        `${Date.now()} CategoryPage: Error fetching subcategories for category ${props.categoryId}`,
        subCategories.error
      );
    }
  }, [subCategories, props.categoryId]);

  const getSubCategoryName = (subCategoryId: number) => {
    let name = '';
    if (subCategories?.isSuccess) {
      const subCategory = subCategories.data.data.find(
        (subCategory) => subCategory.id === subCategoryId
      );
      name = subCategory?.name || '';
    }
    return name;
  };

  return (
    <>
      {subCategories?.isLoading && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <LoadingSpinner label="Loading products..." />
        </div>
      )}
      {subCategories?.isError && (
        <ErrorFetchingData refetchMethod={subCategories.refetch} />
      )}
      {subCategories && subCategories.isSuccess && (
        <div
          className={classNames(
            `w-full flex flex-row align-middle justify-evenly gap-4 px-4 flex-wrap`,
            props.className
          )}>
          {props.products.map((product) => (
            <div key={product.id} className="flex flex-col mt-5 md:mt-0">
              <Link
                href={`/category/${product.category}/subcategory/${product.subCategory}`}
                className="text-center mb-5"
                onClick={() => {
                  if (user) {
                    dispatchUserEvent({
                      user_id: user.id,
                      event_type: 'click',
                      core_component: 'subcategories',
                      description: `Clicked on sub-category ${product.subCategory}`,
                      metadata: {sub_category_id: product.subCategory},
                    });
                  }
                }}>
                <span
                  className={`text-center text-3xl text-violet-900 hover:underline ${gayathri.className}`}>
                  Shop {getSubCategoryName(product.subCategory) || 'All'}
                </span>
              </Link>
              <ProductTile
                key={product.id}
                product={product}
                numberOfProducts={props.products.length}
                className={props.tileClassName}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsShowcaseWithSubcategories;
