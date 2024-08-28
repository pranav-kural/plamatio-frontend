import {Product} from '@/app/types/product-types';
import {Grid} from '@radix-ui/themes';
import {ProductTile} from '../products/productTile';

const sampleProduct: Product = {
  id: 1,
  name: 'Llama Arizona Mug',
  description:
    'Mug with an adorable Llama surrounded by cacti and desert flowers.',
  price: 35,
  previousPrice: 40,
  category: 'drinkware',
  subCategory: 'mugs',
  imageUrl:
    'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716144/texas_llama_mug_qhmaf8.png',
};

const sampleProducts = [
  sampleProduct,
  sampleProduct,
  sampleProduct,
  sampleProduct,
];

export default function LandingPageShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-2">
      {sampleProducts.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
}
