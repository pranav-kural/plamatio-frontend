import classNames from 'classnames';
import {Product} from '@/app/lib/plamatio-backend/types';
import CartButton from '../cart/CartButton';
import ProductTileImage from './ProductTileImage';

type ProductTileProps = {
  product: Product;
  numberOfProducts: number;
  className?: string;
};

export const ProductTile = ({
  product,
  numberOfProducts,
  className,
}: ProductTileProps) => {
  const tileWidth = numberOfProducts === 3 ? 'md:w-[350px]' : 'w-[330px]';
  return (
    <div
      className={classNames(
        'opacity-80 w-[330px] h-full min-h-full transition animate-scaleIn flex flex-col gap-4 justify-start align-top',
        className,
        tileWidth
      )}>
      <ProductTileImage product={product} />
      <div className="flex flex-col h-full min-h-[180px] justify-between gap-2">
        <div className="flex flex-col gap-2">
          <span className={`text-xl font-semibold`}>{product.name}</span>
          <span>{product.description}</span>
        </div>

        <div className="flex flex-row items-center justify-between h-full mt-3 mx-3">
          <div className="flex flex-row justify-between gap-2">
            <span className="font-bold text-lg">${product.price}</span>
            {product.previousPrice &&
              product.price !== product.previousPrice && (
                <span className="line-through text-lg">
                  ${product.previousPrice}
                </span>
              )}
          </div>
          <CartButton product={product} />
        </div>
      </div>
    </div>
  );
};
