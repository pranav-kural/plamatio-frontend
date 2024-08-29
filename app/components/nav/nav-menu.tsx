import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import {SAMPLE_DATA} from '@/app/(data)/sample-data';
import {NavMenuItem, NavMenuSubItem} from './nav-menu-item';

const NavMenu = () => {
  const categories = SAMPLE_DATA.categoriesMap;

  // prepare the menu items for categories
  const categoryMenuItems: NavMenuItem[] = Array.from(categories.values()).map(
    (category) => {
      // prepare nav menu sub items for sub categories
      const subCategoryMenuItems: NavMenuSubItem[] =
        SAMPLE_DATA.getSubCategories(category.id).map((subCategory) => {
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

  return (
    <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
      <NavigationMenu.List className="center m-0 flex list-none rounded-[6px] p-1">
        {categoryMenuItems.map((item) => (
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
  );
};

export default NavMenu;
