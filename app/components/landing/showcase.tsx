import {fetchHeroProducts} from '@/app/lib/plamatio-backend/actions';
import ProductsShowcase from '../products/productsShowcase';
import {ProductsCollection} from '@/app/lib/plamatio-backend/types';
import {FetchProductsBG} from './products';

export default async function LandingPageShowcase() {
  // Fetch hero products
  const heroProductsFetch = await fetchHeroProducts();

  // Check for error
  if (!heroProductsFetch.ok) {
    throw new Error(`
      Failed to fetch hero products: ${heroProductsFetch.statusText}
    `);
  }

  // Parse the response
  const heroProducts = (await heroProductsFetch.json()) as ProductsCollection;

  return (
    <>
      <ProductsShowcase products={heroProducts.data} className="pt-4" />
      <FetchProductsBG />
    </>
  );
}
