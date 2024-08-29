import {Great_Vibes} from 'next/font/google';
import NavMenu from './nav/nav-menu';
import Link from 'next/link';
import {Breadcrumb} from './breadcrumb/breadcrumb';
import LeftBar from './left-bar/leftBar';

const greatVibes = Great_Vibes({weight: '400', subsets: ['latin']});

export const Header = () => {
  return (
    <div className="flex flex-col align-middle justify-center w-full my-5">
      <div
        className={`${greatVibes.className} text-violet-900 text-[3.5rem] text-center`}>
        <Link href="/">Plamatio</Link>
      </div>
      <NavMenu />
      <Breadcrumb />
      <LeftBar />
    </div>
  );
};
