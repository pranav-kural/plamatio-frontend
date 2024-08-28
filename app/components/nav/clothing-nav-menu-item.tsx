import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import {ChevronDown} from 'lucide-react';
import NavListItem from './list-item';
import Link from 'next/link';

export default function ClothingMenuItem() {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-lg font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
        Clothing{' '}
        <ChevronDown
          className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
          size="22"
          aria-hidden
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
        <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr] ">
          <li className="row-span-3 grid">
            <NavigationMenu.Link asChild>
              <Link
                className="focus:shadow-violet7 from-purple9 to-indigo9 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                href="/category/1">
                <svg
                  aria-hidden
                  width="38"
                  height="38"
                  viewBox="0 0 25 25"
                  fill="white">
                  <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                  <path d="M12 0H4V8H12V0Z"></path>
                  <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                </svg>
                <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">
                  Shop Clothing
                </div>
                <p className="text-mauve4 text-[14px] leading-[1.3]">
                  Llama inspired clothing that embraces all cultures and
                  promotes well-being and self-love.
                </p>
              </Link>
            </NavigationMenu.Link>
          </li>

          <NavListItem href="/clothing/tshirts" title="T-shirts">
            T-shirts like never before. Llama inspired, human approved.
          </NavListItem>
          <NavListItem href="/clothing/hoodies" title="Hoodies">
            Hoodies for days good and bad. Cool design to keep you warm.
          </NavListItem>
          <NavListItem href="/clothing/sweatshirts" title="Sweatshirts">
            Sweatshirts that make you sweat. In a good way.
          </NavListItem>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
