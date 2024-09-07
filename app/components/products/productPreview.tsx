import {Product} from '@/app/types/backend-types';
import Image from 'next/image';
import {FC} from 'react';
import AddToCartButton from '../cart/addToCartButton';
import Link from 'next/link';

type ProductPreviewProps = {
  product: Product;
};

export const ProductPreview: FC<ProductPreviewProps> = ({product}) => {
  return (
    <div className="w-full h-full flex flex-col gap-5 md:flex-row align-top justify-start px-5 md:px-20 pt-5">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={600}
        priority={false}
        className="rounded-lg w-full min-w-[300px] max-w-[340px] md:max-w-[500px]"
      />
      <div className="flex flex-col gap-5 sm:px-10 lg:px-20 h-full align-middle justify-evenly">
        <span className={`text-lg md:text-3xl font-semibold`}>
          {product.name}
        </span>
        <span className="md:text-lg">{product.description}</span>
        <div className="flex flex-col md:flex-col gap-10 lg:mt-10 justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-bold text-2xl">${product.price}</span>
            {product.previousPrice && (
              <span className="line-through text-2xl">
                ${product.previousPrice}
              </span>
            )}
          </div>
          <AddToCartButton
            product={product}
            showLabel
            className="lg:max-w-[20vw]"
          />
        </div>
        <Link
          href={`/category/${product.category}/subcategory/${product.subCategory}`}
          className="hover:underline">
          <span>View more products like this.</span>
        </Link>
      </div>
    </div>
  );
};
