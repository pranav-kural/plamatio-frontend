'use client';

import {useGetProductsQuery} from '@/app/lib/api/products-api-slice';

export const FetchProductsBG = () => {
  useGetProductsQuery();
  return <></>;
};
