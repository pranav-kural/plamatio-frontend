'use client';
import {Product} from '@/app/lib/plamatio-backend/types';
import Image from 'next/image';
import {FC} from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import CartButton from '../cart/CartButton';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {useUser} from '@clerk/nextjs';

type ProductPreviewProps = {
  product: Product;
  className?: string;
  labelClassName?: string;
};

export const ProductCheckoutPreview: FC<ProductPreviewProps> = ({
  product,
  className,
  labelClassName,
}) => {
  // get user for recording user events
  const {user} = useUser();

  return (
    <div
      className={classNames(
        `w-full h-full flex flex-col md:flex-row align-top justify-start`,
        className
      )}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={300}
        priority={false}
        className={`rounded-lg w-full min-w-[100px] max-w-[200px] md:max-w-[300px] min-h-[100px] max-h-[200px] md:max-h-[300px]`}
      />
      <div className="h-full min-h-[200px] md:min-h-[300px] flex flex-col gap-1 px-2 sm:px-5 md:px-10 align-middle justify-evenly">
        <div className="w-full flex flex-col gap-2">
          <span className="text-md md:text-xl font-semibold ">
            {product.name}
          </span>
          <span className="text-sm md:text-lg">{product.description}</span>
        </div>
        <div className="flex flex-col md:flex-col gap-4 md:mt-5 justify-between">
          <div className="flex flex-row gap-2 text-md md:text-lg">
            <span className="font-bold">${product.price}</span>
            {product.previousPrice && (
              <span className="line-through">${product.previousPrice}</span>
            )}
          </div>
          <CartButton
            product={product}
            showLabel
            labelClassName={labelClassName}
            className="lg:max-w-[10vw]"
          />
        </div>
        <Link
          href={`/category/${product.category}/subcategory/${product.subCategory}`}
          className="hover:underline"
          onClick={() => {
            // if user available, record user event
            if (user) {
              dispatchUserEvent({
                user_id: user.id,
                event_type: 'click',
                core_component: 'products',
                description: `Clicked on view more products from checkout for product ${product.id}`,
                metadata: {
                  product_id: product.id,
                  category_id: product.category,
                  sub_category_id: product.subCategory,
                },
              });
            }
          }}>
          <span>View more products like this.</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCheckoutPreview;
