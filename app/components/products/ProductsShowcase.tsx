import {Product} from '@/app/lib/plamatio-backend/types';
import {ProductTile} from './ProductTile';
import classNames from 'classnames';
import {FC} from 'react';
import ProductsShowcaseWithSubcategories from './ProductsShowcaseWithSubcategories';

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
  return (
    <>
      {!props.showSubcategories ? (
        <div
          className={classNames(
            `w-full flex flex-row align-middle justify-evenly gap-4 px-4 flex-wrap`,
            props.className
          )}>
          {props.products.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              numberOfProducts={props.products.length}
              className={props.tileClassName}
            />
          ))}
        </div>
      ) : (
        <ProductsShowcaseWithSubcategories {...props} />
      )}
    </>
  );
};

export default ProductsShowcase;
