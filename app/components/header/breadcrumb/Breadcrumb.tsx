'use client';
import {usePathname} from 'next/navigation';
import {FC} from 'react';
import BreadcrumbCategoryPart from './CategoryPart';
import BreadcrumbSubCategortPart from './SubCategoryPart';
import BreadcrumbProductPart from './ProductPart';

type BreadcrumbProps = {
  hidden?: boolean;
  url?: string;
};

export const Breadcrumb: FC<BreadcrumbProps> = ({url, hidden}) => {
  // get the current URL path unless a URL is provided
  const pathname = usePathname();
  if (!url) {
    url = pathname;
  }

  const parts = url.split('/');
  const categoryIndex = parts.indexOf('category');
  const subCategoryIndex = parts.indexOf('subcategory');
  const productIndex = parts.indexOf('product');

  const categoryId =
    categoryIndex !== -1 && parts[categoryIndex + 1]
      ? parseInt(parts[categoryIndex + 1])
      : null;
  const subCategoryId =
    subCategoryIndex !== -1 && parts[subCategoryIndex + 1]
      ? parseInt(parts[subCategoryIndex + 1])
      : null;
  const productId =
    productIndex !== -1 && parts[productIndex + 1]
      ? parseInt(parts[productIndex + 1])
      : null;

  return (
    <>
      {categoryId && (
        <div className="px-1 sm:px-2 md:px-5 z-10">
          <div className={`${hidden ? 'hidden' : ''} text-sm text-violet-900`}>
            {categoryId && <BreadcrumbCategoryPart categoryId={categoryId} />}
            {categoryId && subCategoryId && (
              <BreadcrumbSubCategortPart
                categoryId={categoryId}
                subCategoryId={subCategoryId}
              />
            )}
            {categoryId && subCategoryId && productId && (
              <BreadcrumbProductPart
                categoryId={categoryId}
                subCategoryId={subCategoryId}
                productId={productId}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
