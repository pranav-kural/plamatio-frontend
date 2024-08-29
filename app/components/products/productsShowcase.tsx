import {Product} from '@/app/types/backend-types';
import {ProductTile} from '../products/productTile';
import classNames from 'classnames';
import {FC} from 'react';
import Link from 'next/link';
import {Gayathri} from 'next/font/google';
import {SAMPLE_DATA} from '@/app/(data)/sample-data';

const gayathri = Gayathri({weight: '400', subsets: ['latin']});

type ProductsShowcaseProps = {
  products: Product[];
  className?: string;
  tileClassName?: string;
  showSubcategories?: boolean;
  categoryId?: number;
};

export const ProductsShowcase: FC<ProductsShowcaseProps> = (
  props: ProductsShowcaseProps
) => {
  // get data for the subcategories
  const subCategoriesMap = SAMPLE_DATA.subCategoriesMap;

  return (
    <div
      className={classNames(
        `w-full flex flex-row align-middle justify-evenly gap-4 px-4 flex-wrap`,
        props.className
      )}>
      {props.showSubcategories && subCategoriesMap
        ? props.products.map((product) => (
            <div key={product.id} className="flex flex-col mt-5 md:mt-0">
              <Link
                href={`/category/${props.categoryId}/subcategory/${product.subCategory}`}
                className="text-center mb-5">
                <span
                  className={`text-center text-3xl text-violet-900 hover:underline ${gayathri.className}`}>
                  Shop {subCategoriesMap.get(product.subCategory)?.name || ''}
                </span>
              </Link>
              <ProductTile
                key={product.id}
                product={product}
                numberOfProducts={props.products.length}
                className={props.tileClassName}
              />
            </div>
          ))
        : props.products.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              numberOfProducts={props.products.length}
              className={props.tileClassName}
            />
          ))}
    </div>
  );
};

export default ProductsShowcase;
