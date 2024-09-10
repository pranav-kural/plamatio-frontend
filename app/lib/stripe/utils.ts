import {CartItem, Product} from '@/app/types/backend-types';
import Stripe from 'stripe';
import {CURRENCY} from './config';

export function formatAmountForDisplay(
  amount: number,
  currency: string
): string {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
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

export function getLineItems(
  products: Product[]
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return products.map((product) => ({
    quantity: 1,
    price_data: {
      currency: CURRENCY,
      product_data: {
        name: product.name,
        description: product.description,
        images: [product.imageUrl],
      },
      unit_amount: formatAmountForStripe(product.price, CURRENCY),
    },
    tax_rates: ['txr_1PxI5iCW1LgcWPVvvPVGoT49'],
  }));
}
