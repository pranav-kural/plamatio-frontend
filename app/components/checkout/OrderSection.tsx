'use client';
import {CartItem, Product} from '@/app/types/backend-types';
import {FC, useMemo} from 'react';

type OrderSectionProps = {
  cartItems: CartItem[];
  products: Product[];
};

export const OrderSection: FC<OrderSectionProps> = ({cartItems, products}) => {
  const [orderTotal, numberOfItems, taxes] = useMemo(() => {
    // calculate order total
    const orderTotal = cartItems.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      return (
        Math.round(
          (product ? acc + product.price * item.quantity : acc) * 100
        ) / 100
      );
    }, 0);

    // calculate number of items in cart
    const numberOfItems = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    // calculate taxes
    const taxRate = 0.05;
    const taxes = orderTotal * taxRate;
    // round to 2 decimal places
    const roundedTaxes = Math.round(taxes * 100) / 100;

    return [orderTotal, numberOfItems, roundedTaxes];
  }, [cartItems, products]);

  return (
    <div className="flex flex-col gap-5 p-5 bg-teal-800 text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center rounded-lg">
        <h2 className="text-xl">Order Summary</h2>
        <span className="text-md">{numberOfItems} Items</span>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Subtotal</h2>
        <span className="text-md">${orderTotal}</span>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Taxes</h2>
        <span className="text-md">${taxes}</span>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Shipping</h2>
        <div className="flex flex-row gap-2 justify-between">
          <span className="text-md">{numberOfItems ? 'Free' : '$0'}</span>
          {numberOfItems > 0 && (
            <span className="text-md line-through">${numberOfItems * 1}</span>
          )}
        </div>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Total</h2>
        <span className="text-md">${orderTotal + taxes}</span>
      </div>
    </div>
  );
};

export default OrderSection;
