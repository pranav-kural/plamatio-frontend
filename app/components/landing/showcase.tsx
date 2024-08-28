import {SAMPLE_DATA} from '@/app/(data)/sample-data';
import ProductsShowcase from '../products/productsShowcase';

export default function LandingPageShowcase() {
  return (
    <ProductsShowcase
      products={SAMPLE_DATA.getHeroProducts()}
      className="pt-4"
    />
  );
}
