'use client';
import {DetailedOrder} from '@/app/types/backend-types';
import {OrderAddress} from './OrderAddress';
import {OrderItemTile} from './OrderItemTile';
import {FC, useMemo} from 'react';
import {BadgeCheckIcon, RabbitIcon} from 'lucide-react';
import {formatAmountForDisplay} from '@/app/lib/stripe/utils';
import {DetailedOrderAPIResponse} from '@/app/lib/plamatio-backend/types';

function getDetailedOrder(response: DetailedOrderAPIResponse): DetailedOrder {
  return {
    order: {
      id: response.order.id,
      userId: response.order.user_id,
      addressId: response.order.address_id,
      totalPrice: response.order.total_price,
      createdAt: response.order.created_at,
      status: response.order.status,
    },
    orderItems: response.items.map((item) => ({
      id: item.id,
      orderId: item.order_id,
      productId: item.product_id,
      quantity: item.quantity,
    })),
  };
}

const getFormattedDate = (rfc3339: string): string => {
  console.log(`Date to format: ${rfc3339}`);
  const date = new Date(rfc3339);
  // return as "DD MMM YYYY"
  const fDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  // time as "HH:MM" in 12-hour format
  const fTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  console.log(`Formatted date: ${fDate} ${fTime}`);
  return `${fDate} ${fTime}`;
};

type OrderDetailsTileProps = {
  detailedOrderData: DetailedOrderAPIResponse;
};

export const OrderDetailsTile: FC<OrderDetailsTileProps> = ({
  detailedOrderData,
}) => {
  const detailedOrder = useMemo(
    () => getDetailedOrder(detailedOrderData),
    [detailedOrderData]
  );

  return (
    <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-20 p-5 max-w-[700px] lg:max-w-none border border-gray-200 rounded-lg shadow-md">
      {/* Order details */}
      <div className="w-full flex flex-col gap-5 lg:gap-10 text-lg lg:w-[70%]">
        {/* Order status, total, and date */}
        <div className="w-full flex flex-col gap-3 md:flex-row justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500 text-lg">Status</span>
            <span>
              {detailedOrder.order.status === 'succeeded' && (
                <>
                  <div className="flex flex-row items-center gap-1">
                    <span>Delivered</span>
                    <BadgeCheckIcon
                      className="inline text-green-500"
                      size={20}
                    />
                  </div>
                </>
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-lg">Total</span>{' '}
            <span>
              {formatAmountForDisplay(detailedOrder.order.totalPrice)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-lg">Date</span>
            <span>{getFormattedDate(detailedOrder.order.createdAt)}</span>
          </div>
        </div>
        {/* Shipping address */}
        <OrderAddress addressId={detailedOrder.order.addressId} />
      </div>
      {/* Order items */}
      <div className="w-full flex flex-col gap-3">
        <div className="w-full text-xl text-gray-500">Order Items</div>
        {!detailedOrder.orderItems || detailedOrder.orderItems.length === 0 ? (
          <div className="w-full flex flex-col gap-5 justify-center items-center">
            <span className="text-2xl">
              Oops! No items found <RabbitIcon className="inline" />
            </span>
            <span className="text-lg">
              Looks like there are no items in this order.
            </span>
          </div>
        ) : (
          <>
            {detailedOrder.orderItems?.map((orderItem) => (
              <OrderItemTile orderItem={orderItem} key={orderItem.id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsTile;
