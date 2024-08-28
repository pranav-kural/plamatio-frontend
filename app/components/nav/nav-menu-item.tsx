import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import {ChevronDown, ShirtIcon} from 'lucide-react';
import NavListItem from './list-item';
import Link from 'next/link';
import {FC} from 'react';

export type NavMenuSubItem = {
  id: number;
  name: string;
  description: string;
  link: string;
};

export type NavMenuItem = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  link: string;
  subItems: NavMenuSubItem[];
};

export type NavMenuItemProps = {
  item: NavMenuItem;
};

export const NavMenuItem: FC<NavMenuItemProps> = ({item}: NavMenuItemProps) => {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-lg font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
        {item.name}{' '}
        <ChevronDown
          className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
          size="22"
          aria-hidden
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
        <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr] ">
          <li className={`row-span-4 grid`}>
            <NavigationMenu.Link asChild>
              <Link
                className="focus:shadow-violet7 from-purple9 to-indigo9 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                href={item.link}>
                <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">
                  {item.tagline}
                </div>
                <p className="text-mauve4 text-[14px] leading-[1.3]">
                  {item.description}
                </p>
              </Link>
            </NavigationMenu.Link>
          </li>

          {item.subItems.map((subItem) => (
            <NavListItem
              key={subItem.id}
              href={subItem.link}
              title={subItem.name}>
              {subItem.description}
            </NavListItem>
          ))}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
};
