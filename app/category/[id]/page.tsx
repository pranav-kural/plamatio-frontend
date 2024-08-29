import {SAMPLE_DATA} from '@/app/(data)/sample-data';
import {Breadcrumb} from '@/app/components/breadcrumb/breadcrumb';
import ProductsShowcase from '@/app/components/products/productsShowcase';
import {redirect} from 'next/navigation';

export default async function CategoryPage({params}: {params: {id: string}}) {
  try {
    // parse the category ID from the URL
    const categoryId = parseInt(params.id, 10);

    // hero products
    const heroProducts = SAMPLE_DATA.getCategoryHeroProducts(categoryId);

    return (
      <ProductsShowcase
        products={heroProducts}
        showSubcategories
        className="px-5"
      />
    );
  } catch (error) {
    console.error(error);
    redirect('/');
  }
}
