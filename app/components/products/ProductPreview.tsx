'use client';
import {Product} from '@/app/lib/plamatio-backend/types';
import Image from 'next/image';
import {FC} from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import CartButton from '../cart/CartButton';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {useUser} from '@clerk/nextjs';

type ProductStyleConfig = {
  nameClassName?: string;
  descriptionClassName?: string;
  priceClassName?: string;
  previousPriceClass?: string;
  addToCartButtonClassName?: string;
  addToCartButtonLabelClassName?: string;
  viewMoreClassName?: string;
  detailsContainerClassName?: string;
  priceContainerClassName?: string;
  priceAddToCartContainerClassName?: string;
};

type ProductImageStyleConfig = {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  maxWidthMD?: number;
  height?: number;
  className?: string;
};

type ProductPreviewProps = {
  product: Product;
  className?: string;
  imageStyleConfig?: ProductImageStyleConfig;
  productStyleConfig?: ProductStyleConfig;
};

export const ProductPreview: FC<ProductPreviewProps> = ({
  product,
  className,
  imageStyleConfig,
  productStyleConfig,
}) => {
  // get user if signed in
  const {user} = useUser();

  return (
    <div
      className={classNames(
        `w-full h-full flex flex-col gap-5 md:flex-row items-center justify-center px-5 md:px-20 pt-5`,
        className
      )}>
      <div className="w-full h-full md:w-1/2 md:max-w-[400px] min-w-[350px] min-h-[350px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={800}
          priority={false}
          className={classNames(
            `rounded-lg w-full min-w-[200px] sm:min-w-[300px] md:min-w-[200px] max-w-[340px] md:max-w-[500px]`,
            imageStyleConfig?.className
          )}
        />
      </div>
      <div className="w-full md:w-1/2 md:min-h-[400px] flex flex-col gap-5 sm:px-10 lg:px-20 h-full items-start justify-between">
        <div className="w-full flex flex-col gap-3">
          <span className="text-lg md:text-3xl font-semibold">
            {product.name}
          </span>
          <span className="md:text-lg">{product.description}</span>
        </div>
        <div
          className={classNames(
            'flex flex-col md:flex-col gap-10 lg:mt-10 justify-between',
            productStyleConfig?.priceAddToCartContainerClassName
          )}>
          <div
            className={classNames(
              'flex flex-row gap-2',
              productStyleConfig?.priceContainerClassName
            )}>
            <span
              className={classNames(
                'font-bold text-2xl',
                productStyleConfig?.priceClassName
              )}>
              ${product.price}
            </span>
            {product.previousPrice && (
              <span
                className={classNames(
                  'line-through text-2xl',
                  productStyleConfig?.previousPriceClass
                )}>
                ${product.previousPrice}
              </span>
            )}
          </div>
          <CartButton
            product={product}
            showLabel
            labelClassName={productStyleConfig?.addToCartButtonLabelClassName}
            className={classNames(
              'lg:max-w-[20vw]',
              productStyleConfig?.addToCartButtonClassName
            )}
          />
        </div>
        <Link
          href={`/category/${product.category}/subcategory/${product.subCategory}`}
          className={classNames(
            'hover:underline',
            productStyleConfig?.viewMoreClassName
          )}
          onClick={() => {
            if (user) {
              dispatchUserEvent({
                user_id: user.id,
                event_type: 'click',
                core_component: 'products',
                description: `Clicked on view more products for product ${product.id}`,
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
