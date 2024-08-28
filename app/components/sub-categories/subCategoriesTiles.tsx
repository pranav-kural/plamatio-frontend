import {Box, Flex, Heading, Text} from '@radix-ui/themes';
import Image from 'next/image';

import Link from 'next/link';
import AddToCartButton from '../shop/addToCartButton';
import {Product} from '@/app/types/backend-types';

type ProductTileProps = {
  product: Product;
};

export const SubCategoryTile = ({product}: ProductTileProps) => {
  return (
    <Box className="opacity-80 w-full h-full transition animate-scaleIn hover:opacity-100">
      <Link
        href={`/${product.category}/${product.subCategory}/products/${product.id}`}
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
      <Flex direction="column" gap="2" p="3" bottom="0">
        <Heading size="4">{product.name}</Heading>
        <Text>{product.description}</Text>
        <Flex direction="row" gap="2" justify="between">
          <Flex direction="row" gap="2" className="text-lg">
            <span className="font-bold">${product.price}</span>
            {product.previousPrice && (
              <span className="line-through">${product.previousPrice}</span>
            )}
          </Flex>
          <AddToCartButton id={product.id} />
        </Flex>
      </Flex>
    </Box>
  );
};
