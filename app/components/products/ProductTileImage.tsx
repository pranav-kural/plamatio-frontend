'use client';
import {Product} from '@/app/lib/plamatio-backend/types';
import Link from 'next/link';
import {FC} from 'react';
// import {dispatchUserEvent} from '@/app/lib/kafka/helpers';
import {Logger} from '@/app/utils/logger/Logger';
import Image from 'next/image';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';

// logger
const logger = new Logger({context: 'ProductTileImage'});

type ProductTileImageProps = {
  product: Product;
};

export const ProductTileImage: FC<ProductTileImageProps> = ({product}) => {
  return (
    <Link
      href={`/category/${product.category}/subcategory/${product.subCategory}/product/${product.id}`}
      className="p-0 m-0"
      onClick={() => {
        logger.info(
          `Dispatching user event for product tile click for product ${product.id}`
        );
        dispatchUserEvent({
          event_type: 'click',
          core_component: 'product_tile',
          description: `Clicked on product tile for product ${product.id}`,
          metadata: {product_id: product.id},
        });
      }}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={600}
        priority={false}
        className="rounded-lg w-full"
      />
    </Link>
  );
};

export default ProductTileImage;
