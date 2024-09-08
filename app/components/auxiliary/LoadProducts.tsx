'use client';

import {useGetProductsQuery} from '@/app/lib/api/products-api-slice';

export const LoadProducts = () => {
  useGetProductsQuery();
  return <></>;
};

export default LoadProducts;
