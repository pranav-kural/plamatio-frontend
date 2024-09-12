import {SignedIn, SignedOut, SignOutButton} from '@clerk/nextjs';
import {User2Icon} from 'lucide-react';
import Link from 'next/link';

export const SignInSignUpButtons = () => {
  return (
    <div className="flex flex-row items-center justify-center rounded-lg">
      <SignedOut>
        <Link
          href="/auth/sign-in"
          className="text-center text-violet-900 hover:bg-violet-50 rounded-lg px-2 py-1 md:px-3 md:py-2">
          <span className={`font-[500]`}>Sign in</span>
        </Link>
        <Link
          href="/auth/sign-up"
          className="bg-violet-900 hover:bg-violet-800 text-white rounded-lg text-center px-2 py-1 md:px-3 md:py-2">
          Sign up
        </Link>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <div className="w-full flex flex-row gap-2 text-violet-900 text-md items-center cursor-pointer hover:bg-violet-50 px-2 py-1 md:px-3 md:py-2">
            <span>Sign Out</span>
            <User2Icon size={20} />
          </div>
        </SignOutButton>
      </SignedIn>
    </div>
  );
};

export default SignInSignUpButtons;
