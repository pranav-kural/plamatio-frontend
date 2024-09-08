import {Product} from '@/app/types/backend-types';
import Image from 'next/image';
import {FC} from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import CartButton from '../cart/cartButton';

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
  return (
    <div
      className={classNames(
        `w-full h-full flex flex-col gap-5 md:flex-row align-top justify-start px-5 md:px-20 pt-5`,
        className
      )}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={imageStyleConfig?.width ?? 400}
        height={imageStyleConfig?.height ?? 600}
        priority={false}
        className={classNames(
          `rounded-lg w-full min-w-[${imageStyleConfig?.minWidth ?? '300'}px] max-w-[${imageStyleConfig?.maxWidth ?? '340'}px] md:max-w-[${imageStyleConfig?.maxWidthMD ?? '500'}px]`,
          imageStyleConfig?.className
        )}
      />
      <div
        className={classNames(
          'flex flex-col gap-5 sm:px-10 lg:px-20 h-full align-middle justify-evenly',
          productStyleConfig?.detailsContainerClassName
        )}>
        <span
          className={classNames(
            `text-lg md:text-3xl font-semibold`,
            productStyleConfig?.nameClassName
          )}>
          {product.name}
        </span>
        <span
          className={classNames(
            'md:text-lg',
            productStyleConfig?.descriptionClassName
          )}>
          {product.description}
        </span>
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
          )}>
          <span>View more products like this.</span>
        </Link>
      </div>
    </div>
  );
};
