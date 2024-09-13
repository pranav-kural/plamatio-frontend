import {SignedIn, SignedOut} from '@clerk/nextjs';
import UserDropdownMenu from './UserDropdownMenu';
import SignInSignUpButtons from '@/app/components/auth/SigInSignUpButtons';

const UserButtons = () => {
  return (
    <div className="flex flex-row items-center justify-center rounded-lg">
      <SignedOut>
        <div className="hidden md:block">
          <SignInSignUpButtons />
        </div>
        <div className="md:hidden w-full h-hull flex flex-row items-center justify-center">
          <UserDropdownMenu />
        </div>
      </SignedOut>
      <SignedIn>
        <UserDropdownMenu />
      </SignedIn>
    </div>
  );
};

export default UserButtons;
