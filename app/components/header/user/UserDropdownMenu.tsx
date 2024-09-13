import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {TextIcon, User2Icon, UserRoundMinusIcon} from 'lucide-react';
import Link from 'next/link';
import {SignedIn, SignedOut, SignOutButton} from '@clerk/nextjs';

const UserDropdownMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet-800 bg-white outline-none hover:bg-violet3"
          aria-label="User Menu">
          <User2Icon size={35} strokeWidth={1.3} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-20 min-w-[110px] bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] border border-violet-100 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mr-7"
          sideOffset={5}>
          <SignedIn>
            <DropdownMenu.Item className="group text-md leading-none text-violet-800 rounded-[3px] flex items-center h-full relative px-[25px] select-none outline-none data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 py-3 mt-1 cursor-pointer">
              <Link href="/orders">
                <div className="w-full h-full flex flex-row gap-2 items-center justify-center">
                  <TextIcon />
                  <span>Orders</span>
                </div>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-[1px] bg-violet-100 m-[5px]" />

            <DropdownMenu.Item className="group text-md leading-none text-violet-800 rounded-[3px] flex items-center h-full relative px-[25px] select-none outline-none data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 py-3 cursor-pointer">
              <SignOutButton>
                <div className="w-full h-full flex flex-row gap-2 items-center justify-center">
                  <UserRoundMinusIcon />
                  <span>Sign Out</span>
                </div>
              </SignOutButton>
            </DropdownMenu.Item>
          </SignedIn>

          <SignedOut>
            <DropdownMenu.Item className="group text-md leading-none text-violet-800 rounded-[3px] flex items-center h-full relative px-[25px] select-none outline-none data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 py-4 cursor-pointer">
              <Link
                href="/auth/sign-in"
                className="w-full h-full flex flex-row gap-2 items-center justify-center">
                <span className={`font-[500]`}>Sign in</span>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="group text-md leading-none h-full bg-violet-800 hover:bg-violet-900 text-white rounded-b-lg flex items-center relative px-[25px] select-none outline-none data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:text-violet1 py-4 cursor-pointer">
              <Link
                href="/auth/sign-up"
                className="w-full h-full flex flex-row gap-2 items-center justify-center">
                <span className={`font-[500]`}>Sign up</span>
              </Link>
            </DropdownMenu.Item>
          </SignedOut>

          <DropdownMenu.Arrow className="fill-violet-700 mr-7" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdownMenu;
