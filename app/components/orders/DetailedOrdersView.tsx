'use client';
import {FC, useMemo} from 'react';
import OrderDetailsTile from './OrderDetailsTile';
import {Raleway} from 'next/font/google';
import Link from 'next/link';
import {RabbitIcon} from 'lucide-react';
import {useGetDetailedOrdersQuery} from '@/app/lib/api/orders-slice';
import ErrorFetchingData from '../error/ErrorFetchingData';
import {LoadingSpinner} from '../ui/LoadingSpinner';

const raleway = Raleway({weight: '500', subsets: ['latin']});

type DetailedOrdersViewProps = {
  userId: string;
};

// Component to display detailed orders for a user
export const DetailedOrdersView: FC<DetailedOrdersViewProps> = ({userId}) => {
  // fetch the detailed orders from the backend for current user
  const detailedOrdersFetch = useGetDetailedOrdersQuery(userId);

  // Log error if any occurs during fetching data
  useMemo(() => {
    if (detailedOrdersFetch.isError) {
      console.error(
        `${Date.now()} DetailedOrdersView: Error fetching data: user ${userId}`,
        detailedOrdersFetch.error
      );
    }
  }, [detailedOrdersFetch.isError, detailedOrdersFetch.error, userId]);

  return (
    <div className="w-full h-full flex flex-col gap-5 p-2">
      <h1 className={`text-3xl text-violet-800 ${raleway.className}`}>
        All Orders
      </h1>
      <p>Find the details of all your orders below.</p>
      {/* While loading */}
      {detailedOrdersFetch.isLoading && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <LoadingSpinner label="Loading data..." />
        </div>
      )}

      {/* If error occurs */}
      {detailedOrdersFetch.isError && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <ErrorFetchingData refetchMethod={detailedOrdersFetch.refetch} />
        </div>
      )}

      {/* If data is fetched */}
      {detailedOrdersFetch.isSuccess && (
        <div
          className={`w-full h-full flex flex-col gap-5 items-center justify-start ${!detailedOrdersFetch ? 'justify-center' : ''}`}>
          {detailedOrdersFetch?.data?.data &&
            detailedOrdersFetch.data.data.map((detailedOrder) => (
              <OrderDetailsTile
                detailedOrderData={detailedOrder}
                key={detailedOrder.order.id}
              />
            ))}
          {(!detailedOrdersFetch?.data?.data ||
            detailedOrdersFetch.data.data.length === 0) && (
            <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
              <span className="text-2xl">
                Oops! No orders found <RabbitIcon className="inline" />
              </span>
              <span className="text-lg">
                Check out our great collection of{' '}
                <Link href="/" className="text-violet-700 font-[500]">
                  Llama-inspired products
                </Link>{' '}
                to find the perfect match.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailedOrdersView;
