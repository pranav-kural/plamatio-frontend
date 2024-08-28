import {Great_Vibes} from 'next/font/google';
import NavMenu from './nav-menu';
import Link from 'next/link';

const greatVibes = Great_Vibes({weight: '400', subsets: ['latin']});

export const Header = () => {
  return (
    <div className="flex flex-col align-middle justify-center w-full my-5">
      <Link href="/">
        <div
          className={`${greatVibes.className} text-violet-900 text-[3.5rem] text-center`}>
          Plamatio
        </div>
      </Link>
      <NavMenu />
    </div>
  );
};
