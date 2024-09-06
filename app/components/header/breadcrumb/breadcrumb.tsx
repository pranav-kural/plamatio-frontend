'use client';

import {SAMPLE_DATA} from '@/app/(data)/sample-data';
import {HomeIcon} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {FC, useEffect, useState} from 'react';

type BreadcrumbProps = {
  hidden?: boolean;
  url?: string;
};

export const Breadcrumb: FC<BreadcrumbProps> = ({url, hidden}) => {
  const [breadcrumb, setBreadcrumb] = useState<JSX.Element[]>([]);

  // get the current URL path unless a URL is provided
  const pathname = usePathname();
  if (!url) {
    url = pathname;
  }

  useEffect(() => {
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

    const breadcrumbParts: JSX.Element[] = [];

    if (categoryId) {
      const categoryName = SAMPLE_DATA.getCategoryName(categoryId);
      if (categoryName) {
        breadcrumbParts.push(
          <Link key="home" href="/" className="cursor-pointer">
            <HomeIcon className="inline mb-1" size={18} strokeWidth={1.5} />
          </Link>,
          // <Separator id="separator0" />,
          <span key="separator0" className="mx-2">
            {'>'}
          </span>,
          <Link
            key="category"
            href={`/category/${categoryId}`}
            className="cursor-pointer">
            {categoryName}
          </Link>
        );
      }
    }

    if (subCategoryId) {
      const subCategoryName = SAMPLE_DATA.getSubCategoryName(subCategoryId);
      if (subCategoryName) {
        breadcrumbParts.push(
          // <Separator id="separator1" />,
          <span key="separator1" className="mx-2">
            {'>'}
          </span>,
          <Link
            key="subcategory"
            href={`/category/${categoryId}/subcategory/${subCategoryId}`}
            className="cursor-pointer">
            {subCategoryName}
          </Link>
        );
      }
    }

    if (productId) {
      const productName = SAMPLE_DATA.getProductName(productId);
      if (productName) {
        breadcrumbParts.push(
          // <Separator id="separator2" />,
          <span key="separator2" className="mx-2">
            {'>'}
          </span>,
          <Link
            key="product"
            href={`/category/${categoryId}/subcategory/${subCategoryId}/product/${productId}`}
            className="cursor-pointer">
            {productName}
          </Link>
        );
      }
    }

    setBreadcrumb(breadcrumbParts);
  }, [url]);

  return (
    <div className="absolute top-[115px] left-10 z-10">
      <div className={`${hidden ? 'hidden' : ''} text-sm text-violet-900`}>
        {breadcrumb}
      </div>
    </div>
  );
};
