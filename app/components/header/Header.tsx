import {Great_Vibes} from 'next/font/google';
import NavMenu from './nav/NavMenu';
import Link from 'next/link';
import {Breadcrumb} from './breadcrumb/Breadcrumb';
import UserButtons from './user/UserButtons';
import CartDropdownMenu from './cart/CartDropdownMenu';

const greatVibes = Great_Vibes({weight: '400', subsets: ['latin']});

export const Header = () => {
  return (
    <div className="flex flex-col align-middle justify-center w-full my-5">
      <div className="w-full flex flex-col items-center justify-center mt-5 xs:mt-0">
        <Link
          href="/"
          className={`${greatVibes.className} text-violet-900 text-[3.5rem]`}>
          Plamatio
        </Link>
        <NavMenu />
      </div>
      <div className="absolute top-[20px] right-[10px] md:right-[30px]">
        <div className="w-full h-full flex flex-row gap-2 md:gap-4 items-center justify-center">
          <UserButtons />
          <CartDropdownMenu />
        </div>
      </div>
      <Breadcrumb />
    </div>
  );
};
