import {Box, Flex, Heading, Text} from '@radix-ui/themes';
import Image from 'next/image';

import Link from 'next/link';
import AddToCartButton from '../shop/addToCartButton';
import {Product} from '@/app/types/backend-types';

type ProductTileProps = {
  product: Product;
};

export const ProductTile = ({product}: ProductTileProps) => {
  return (
    <div className="opacity-80 w-full h-full transition animate-scaleIn hover:opacity-100 flex flex-col gap-2 justify-between">
      <Link
        href={`/category/${product.category}/subcategory/${product.subCategory}/product/${product.id}`}
        className="p-0 m-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={600}
          priority={false}
          className="rounded-lg w-full"
        />
      </Link>
      <div className="flex flex-col gap-2">
        <span className={`text-xl font-semibold`}>{product.name}</span>
        <Text>{product.description}</Text>
      </div>
      <div className="flex flex-row justify-between mt-3 mx-3">
        <div className="flex flex-row gap-2">
          <span className="font-bold text-lg">${product.price}</span>
          {product.previousPrice && (
            <span className="line-through text-lg">
              ${product.previousPrice}
            </span>
          )}
        </div>
        <AddToCartButton id={product.id} />
      </div>
    </div>
  );
};
