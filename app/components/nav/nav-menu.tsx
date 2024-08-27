import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import {ChevronDownIcon} from '@radix-ui/themes';
import NavListItem from './list-item';
import ClothingMenuItem from './clothing-nav-menu-item';

const NavMenu = () => {
  return (
    <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
      <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px]">
        <ClothingMenuItem />

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
            Overview{' '}
            <ChevronDownIcon
              className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
            <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
              <NavListItem
                title="Introduction"
                href="/primitives/docs/overview/introduction">
                Build high-quality, accessible design systems and web apps.
              </NavListItem>
              <NavListItem
                title="Getting started"
                href="/primitives/docs/overview/getting-started">
                A quick tutorial to get you up and running with Radix
                Primitives.
              </NavListItem>
              <NavListItem
                title="Styling"
                href="/primitives/docs/guides/styling">
                Unstyled and compatible with any styling solution.
              </NavListItem>
              <NavListItem
                title="Animation"
                href="/primitives/docs/guides/animation">
                Use CSS keyframes or any animation library of your choice.
              </NavListItem>
              <NavListItem
                title="Accessibility"
                href="/primitives/docs/overview/accessibility">
                Tested in a range of browsers and assistive technologies.
              </NavListItem>
              <NavListItem
                title="Releases"
                href="/primitives/docs/overview/releases">
                Radix Primitives releases and their changelogs.
              </NavListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
            href="https://github.com/radix-ui">
            Github
          </NavigationMenu.Link>
        </NavigationMenu.Item>

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
