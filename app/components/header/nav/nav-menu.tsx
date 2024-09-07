'use client';

import React, {useMemo} from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import {NavMenuItem, NavMenuSubItem} from './nav-menu-item';
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
} from '@/app/lib/features/api/categories-slice';
import {LoadingSpinner} from '../../ui/loading-spinner';
import ErrorFetchingData from '../../error/errorFetchingData';

const NavMenu = () => {
  // const [menuItems, setMenuItems] = React.useState<NavMenuItem[]>([]);

  // get categories and subcategories data
  const categoriesFetch = useGetCategoriesQuery();
  const subCategoriesFetch = useGetSubCategoriesQuery();

  // if (categoriesFetch.isSuccess && subCategoriesFetch.isSuccess) {
  //   const categories = categoriesFetch.data;
  //   const subCategories = subCategoriesFetch.data;

  //   // prepare the menu items for categories
  //   const categoryMenuItems: NavMenuItem[] = categories.data.map((category) => {
  //     // prepare nav menu sub items for sub categories
  //     const subCategoryMenuItems: NavMenuSubItem[] = subCategories.data
  //       .filter((subCategory) => subCategory.categoryId === category.id)
  //       .map((subCategory) => {
  //         return {
  //           id: subCategory.id,
  //           name: subCategory.name,
  //           description: subCategory.description,
  //           link: `/category/${category.id}/subcategory/${subCategory.id}`,
  //         };
  //       });

  //     return {
  //       id: category.id,
  //       name: category.name,
  //       tagline: `Shop ${category.name}`,
  //       description: category.description,
  //       link: `/category/${category.id}`,
  //       subItems: subCategoryMenuItems,
  //     };
  //   });

  //   setMenuItems(categoryMenuItems);
  // }

  const getMenuItems: NavMenuItem[] = useMemo(() => {
    if (categoriesFetch.data && subCategoriesFetch.data) {
      const categories = categoriesFetch.data;
      const subCategories = subCategoriesFetch.data;

      // prepare the menu items for categories
      const categoryMenuItems: NavMenuItem[] = categories.data.map(
        (category) => {
          // prepare nav menu sub items for sub categories
          const subCategoryMenuItems: NavMenuSubItem[] = subCategories.data
            .filter((subCategory) => subCategory.category === category.id)
            .map((subCategory) => {
              return {
                id: subCategory.id,
                name: subCategory.name,
                description: subCategory.description,
                link: `/category/${category.id}/subcategory/${subCategory.id}`,
              };
            });

          return {
            id: category.id,
            name: category.name,
            tagline: `Shop ${category.name}`,
            description: category.description,
            link: `/category/${category.id}`,
            subItems: subCategoryMenuItems,
          };
        }
      );

      return categoryMenuItems;
    } else {
      return [];
    }
  }, [categoriesFetch.data, subCategoriesFetch.data]);

  return (
    <>
      {(categoriesFetch.isLoading || subCategoriesFetch.isLoading) && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <LoadingSpinner label="Loading data..." />
        </div>
      )}
      {categoriesFetch.isError && (
        <ErrorFetchingData refetchMethod={categoriesFetch.refetch} />
      )}
      {subCategoriesFetch.isError && (
        <ErrorFetchingData refetchMethod={subCategoriesFetch.refetch} />
      )}
      {categoriesFetch.isSuccess && subCategoriesFetch.isSuccess && (
        <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
          {/* {JSON.stringify(subCategoriesFetch.data)} */}
          <NavigationMenu.List className="center m-0 flex list-none rounded-[6px] p-1">
            {getMenuItems.map((item) => (
              <NavMenuItem key={item.id} item={item} />
            ))}

            <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
              <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
            <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
          </div>
        </NavigationMenu.Root>
      )}
    </>
  );
};

export default NavMenu;
