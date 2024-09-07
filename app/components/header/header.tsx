import {Great_Vibes} from 'next/font/google';
import NavMenu from './nav/nav-menu';
import Link from 'next/link';
import {Breadcrumb} from './breadcrumb/breadcrumb';
import CartIcon from '../cart/cartIcon';
import SignInSignUpButtons from '../auth/sigInSignUpButtons';

const greatVibes = Great_Vibes({weight: '400', subsets: ['latin']});

export const Header = () => {
  return (
    <div className="flex flex-col align-middle justify-center w-full my-5">
      <div
        className={`${greatVibes.className} text-violet-900 text-[3.5rem] text-center`}>
        <Link href="/">Plamatio</Link>
      </div>
      <div className="absolute top-[80px] right-[10px] md:right-[30px]">
        <CartIcon />
      </div>
      <NavMenu />
      <div className="absolute top-[20px] right-[10px] md:right-[30px]">
        <SignInSignUpButtons />
      </div>
      <Breadcrumb />
    </div>
  );
};
