import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import ClothingMenuItem from './clothing-nav-menu-item';
import AccessoriesMenuItem from './accessories-nav-menu-item';
import DrinkwareMenuItem from './drinkware-nav-menu-item';

const NavMenu = () => {
  return (
    <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
      <NavigationMenu.List className="center m-0 flex list-none rounded-[6px] bg-white p-1">
        <ClothingMenuItem />

        <AccessoriesMenuItem />

        <DrinkwareMenuItem />

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
