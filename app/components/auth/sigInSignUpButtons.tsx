export const SignInSignUpButtons = () => {
  return (
    <div className="flex rounded-lg">
      <button className="text-center text-violet-900 px-5 hover:bg-violet-50 rounded-lg">
        <span className={`font-[500]`}>Sign in</span>
      </button>
      <button className="bg-violet-900 hover:bg-violet-800 text-white rounded-lg text-center px-2 py-1 md:px-3 md:py-2">
        Sign up
      </button>
    </div>
  );
};

export default SignInSignUpButtons;
