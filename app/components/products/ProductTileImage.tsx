'use client';
import {Product} from '@/app/lib/plamatio-backend/types';
import Link from 'next/link';
import {FC} from 'react';
import Image from 'next/image';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import classNames from 'classnames';
import {useUser} from '@clerk/nextjs';

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
  // get user if signed in
  const {user} = useUser();

  return (
    <Link
      href={`/category/${product.category}/subcategory/${product.subCategory}/product/${product.id}`}
      className="p-0 m-0"
      onClick={() => {
        if (user) {
          dispatchUserEvent({
            user_id: user.id,
            event_type: 'click',
            core_component: 'product_tile',
            description:
              eventDescription ??
              `Clicked on product tile for product ${product.id}`,
            metadata: {product_id: product.id},
          });
        }
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
