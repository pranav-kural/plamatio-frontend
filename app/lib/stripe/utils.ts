import {
  CartItem,
  NewDetailedOrderItem,
  NewOrder,
  Product,
} from '@/app/types/backend-types';
import Stripe from 'stripe';
import {CURRENCY} from './config';
import {NewDetailedOrder} from '@/app/lib/plamatio-backend/types';
import {OrderDetailsProduct} from '@/app/types/types';

export function formatAmountForDisplay(
  amount: number,
  currency?: string
): string {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency ?? 'CAD',
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount);
}

export function formatAmountForStripe(
  amount: number,
  currency: string
): number {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export function getProductFromLineItem(
  data: Stripe.Checkout.SessionCreateParams.LineItem
): OrderDetailsProduct {
  if (!data.price_data?.product_data?.metadata?.productId) {
    throw new Error('Product ID not found');
  }
  if (!data.price_data?.product_data?.name) {
    throw new Error('Product name not found');
  }
  if (!data.price_data?.unit_amount) {
    throw new Error('Product price not found');
  }
  if (!data.quantity) {
    throw new Error('Product quantity not found');
  }
  try {
    parseInt(data.price_data.product_data.metadata.productId as string);
  } catch (error) {
    throw new Error(`Invalid product ID ${error}`);
  }
  return {
    id: parseInt(data.price_data.product_data.metadata.productId as string),
    name: data.price_data.product_data.name,
    description: data.price_data.product_data.description || '',
    imageUrl: data.price_data.product_data.images?.[0] || '',
    price: data.price_data.unit_amount,
    quantity: data.quantity,
  };
}

export function getProductData(products: Product[], productId: number) {
  // get the product by id
  const product = products.find((product) => product.id === productId);
  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }
  // return product data
  return {
    currency: CURRENCY,
    product_data: {
      name: product.name,
      description: product.description,
      images: [product.imageUrl],
      metadata: {
        productId: product.id,
      },
    },
    unit_amount: formatAmountForStripe(product.price, CURRENCY),
  };
}

export function getCartLineItems(
  cartItems: CartItem[],
  products: Product[]
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return cartItems.map((cartItem) => {
    const product = getProductData(products, cartItem.productId);
    return {
      price_data: product,
      quantity: cartItem.quantity,
      tax_rates: ['txr_1PxI5iCW1LgcWPVvvPVGoT49'],
    };
  });
}

export function getNewOrder(
  userId: string,
  data: Stripe.Checkout.Session
): NewOrder {
  if (!data.payment_intent) {
    throw new Error('Payment intent not found');
  }
  if (!data.metadata) {
    throw new Error('Metadata not found');
  }
  if (!data.metadata.addressId) {
    throw new Error('Address ID not found');
  }
  try {
    parseInt(data.metadata.addressId);
  } catch (error) {
    throw new Error(`Invalid address ID ${error}`);
  }
  if (!data.amount_total) {
    throw new Error('Total amount not found');
  }
  if (!data.status) {
    throw new Error('Order status not found');
  }
  if (!data.payment_status) {
    throw new Error('Payment status not found');
  }
  const paymentInent = data.payment_intent as Stripe.PaymentIntent;
  if (!paymentInent.client_secret) {
    throw new Error('Client secret not found');
  }
  return {
    userId,
    addressId: parseInt(data.metadata.addressId),
    totalPrice: data.amount_total,
    status: data.status,
    paymentStatus: data.payment_status,
    clientSecret: paymentInent.client_secret,
  };
}

export function getNewOrderItems(
  data: Stripe.Checkout.Session
): NewDetailedOrderItem[] {
  if (!data.metadata) {
    throw new Error('Metadata not found');
  }
  if (!data.line_items) {
    throw new Error('Line items not found');
  }
  if (!data.line_items.data) {
    throw new Error('Line items data not found');
  }
  const orderItems = data.line_items.data.map((lineItem) => {
    if (lineItem.price?.metadata) {
      throw new Error('Price metadata not found');
    }
    if (!lineItem.quantity) {
      throw new Error('Quantity not found');
    }
    if (!lineItem.price?.metadata?.productId) {
      throw new Error('Product ID not found');
    }
    try {
      parseInt(lineItem.price.metadata.productId);
    } catch (error) {
      throw new Error(`Invalid product ID ${error}`);
    }

    return {
      productId: parseInt(lineItem.price.metadata.productId),
      quantity: lineItem.quantity,
    };
  });
  return orderItems;
}

export function getNewDetailedOrder(
  userId: string,
  data: Stripe.Checkout.Session
): NewDetailedOrder {
  return {
    order: getNewOrder(userId, data),
    orderItems: getNewOrderItems(data),
  };
}
