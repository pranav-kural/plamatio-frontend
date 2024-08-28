import {Product} from '@/app/types/backend-types';
import {ProductTile} from '../products/productTile';
import classNames from 'classnames';
import {FC} from 'react';

type ProductsShowcaseProps = {
  products: Product[];
  className?: string;
};

export const ProductsShowcase: FC<ProductsShowcaseProps> = (
  props: ProductsShowcaseProps
) => {
  return (
    <div
      className={classNames(
        `grid grid-cols-1 md:grid-cols-${props.products.length >= 3 ? 3 : props.products.length} lg:grid-cols-${props.products.length >= 4 ? 4 : props.products.length} gap-4 mx-2`,
        props.className
      )}>
      {}
      {props.products.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsShowcase;
