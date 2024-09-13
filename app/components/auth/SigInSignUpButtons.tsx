import Link from 'next/link';

export const SignInSignUpButtons = () => {
  return (
    <div className="w-full h-hull flex flex-row items-center justify-center">
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
    </div>
  );
};

export default SignInSignUpButtons;
