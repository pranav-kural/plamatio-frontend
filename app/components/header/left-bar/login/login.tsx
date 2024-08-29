export const LoginSignupButtons = () => {
  return (
    <div className="flex border border-violet-900 text-violet-900 rounded-lg">
      <button className="text-center px-5 hover:bg-violet-50 rounded-lg">
        Login
      </button>
      <button className="bg-violet-900 hover:bg-violet-800 text-white rounded-lg text-center px-5 py-2">
        Sign up
      </button>
    </div>
  );
};

export default LoginSignupButtons;
