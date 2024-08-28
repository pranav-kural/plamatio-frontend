import {SAMPLE_DATA} from '@/app/(data)/sample-data';
import {ProductTile} from '@/app/components/products/productTile';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {Gayathri} from 'next/font/google';

const gayathri = Gayathri({weight: '400', subsets: ['latin']});

export default async function CategoryPage({params}: {params: {id: string}}) {
  try {
    // parse the category ID from the URL
    const categoryId = parseInt(params.id, 10);

    // hero products
    const heroProducts = SAMPLE_DATA.getCategoryHeroProducts(categoryId);

    // get data for the subcategories
    const subCategoriesMap = SAMPLE_DATA.subCategoriesMap;

    return (
      <div className="w-full flex flex-col align-middle justify-center px-1">
        <div
          className={`grid grid-cols-1 md:grid-cols-${heroProducts.length >= 3 ? 3 : heroProducts.length} lg:grid-cols-${heroProducts.length >= 4 ? 4 : heroProducts.length} gap-2 mx-2`}>
          {heroProducts.map((product) => (
            <div key={product.id} className="flex flex-col">
              <Link
                href={`/category/${categoryId}/subcategory/${product.subCategory}`}
                className="text-center mb-5">
                <span
                  className={`text-center text-3xl text-violet-900 hover:underline ${gayathri.className}`}>
                  Shop {subCategoriesMap.get(product.subCategory)?.name || ''}
                </span>
              </Link>
              <ProductTile key={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    redirect('/');
  }
}
