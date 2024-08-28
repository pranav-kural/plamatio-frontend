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
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mx-2',
        props.className
      )}>
      {props.products.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsShowcase;
