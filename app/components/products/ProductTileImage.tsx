'use client';
import {Product} from '@/app/lib/plamatio-backend/types';
import Link from 'next/link';
import {FC} from 'react';
// import {dispatchUserEvent} from '@/app/lib/kafka/helpers';
import {Logger} from '@/app/utils/logger/Logger';
import Image from 'next/image';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import classNames from 'classnames';

// logger
const logger = new Logger({context: 'ProductTileImage'});

type ProductTileImageProps = {
  product: Product;
  imgHeight?: number;
  imgWidth?: number;
  imgClassName?: string;
  priority?: boolean;
  eventDescription?: string;
};

export const ProductTileImage: FC<ProductTileImageProps> = ({
  product,
  imgHeight,
  imgWidth,
  imgClassName,
  priority,
  eventDescription,
}) => {
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
          description:
            eventDescription ??
            `Clicked on product tile for product ${product.id}`,
          metadata: {product_id: product.id},
        });
      }}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={imgWidth ?? 400}
        height={imgHeight ?? 600}
        priority={priority}
        className={classNames('rounded-lg w-full', imgClassName)}
      />
    </Link>
  );
};

export default ProductTileImage;
