'use client';
import {useGetProductQuery} from '@/app/lib/api/products-api-slice';
import {OrderItem} from '@/app/lib/plamatio-backend/types';
import Image from 'next/image';
import Link from 'next/link';
import {FC, useMemo} from 'react';
import {LoadingSpinner} from '../ui/LoadingSpinner';
import ErrorFetchingData from '../error/ErrorFetchingData';

type OrderItemTileProps = {
  orderItem: OrderItem;
};

export const OrderItemTile: FC<OrderItemTileProps> = ({orderItem}) => {
  // Ideally, we would fetch the product details from the backend
  const productFetch = useGetProductQuery(orderItem.productId);

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (productFetch.isError) {
      console.error(
        `${Date.now()} OrderItemTile: Error fetching data: order item ${orderItem.id}, product ID: ${orderItem.productId}`,
        productFetch.error
      );
    }
  }, [
    productFetch.isError,
    productFetch.error,
    orderItem.id,
    orderItem.productId,
  ]);

  return (
    <>
      {/* While loading */}
      {productFetch.isLoading && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <LoadingSpinner label="Loading data..." />
        </div>
      )}

      {/* If error occurs */}
      {productFetch.isError && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <ErrorFetchingData refetchMethod={productFetch.refetch} />
        </div>
      )}

      {/* If data is fetched */}
      {productFetch.isSuccess && productFetch.data && (
        <div className="w-full h-full flex flex-col md:flex-row gap-4 p-2 max-w-[500px] md:max-w-[700px]">
          <div className="xs:w-full md:w-[150x] md:h-[150px]">
            <Link
              href={`/category/${productFetch.data.category}/subcategory/${productFetch.data.subCategory}/product/${productFetch.data.id}`}
              className="p-0 m-0">
              <Image
                src={productFetch.data.imageUrl}
                alt={productFetch.data.name}
                width={100}
                height={100}
                priority={false}
                className="w-full h-full rounded-lg opacity-80 hover:opacity-100"
              />
            </Link>
          </div>
          <div className="h-full flex flex-col justify-between gap-1">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-[500]">
                {productFetch.data.name}
              </span>
              <span className="text-md">Quantity: {orderItem.quantity}</span>
            </div>
            <span className="w-full max-w-[300px] md:max-w-[500px] pt-2 text-gray-500">
              {productFetch.data.description}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderItemTile;
