import {Product} from '@/app/types/backend-types';
import {ProductTile} from '../products/productTile';
import classNames from 'classnames';
import {FC, useMemo} from 'react';
import Link from 'next/link';
import {Gayathri} from 'next/font/google';
import {useGetSubCategoriesByCategoryQuery} from '@/app/lib/features/api/categories-slice';
import {LoadingSpinner} from '../ui/loading-spinner';
import ErrorFetchingData from '../error/errorFetchingData';

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

  // get data for the subcategories
  let subCategories = undefined;

  // if showing subcategories
  if (!categoryId) {
    console.error(
      'ProductsShowcaseWithSubcategories: categoryId is required. Will show products without subcategories by default.'
    );
  } else {
    subCategories = useGetSubCategoriesByCategoryQuery(categoryId);
  }

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (subCategories && subCategories.isError) {
      console.error(
        `${Date.now()} CategoryPage: Error fetching subcategories for category ${props.categoryId}`,
        subCategories.error
      );
    }
  }, [subCategories, subCategories?.isError, subCategories?.error]);

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
                className="text-center mb-5">
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