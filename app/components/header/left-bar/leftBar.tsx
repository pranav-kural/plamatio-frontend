import Cart from './cart/cart';
import LoginSignupButtons from './login/login';

export const LeftBar = () => {
  return (
    <div className="absolute top-[20px] right-[20px] text-violet-900 flex flex-row items-center gap-3">
      <Cart />
      <LoginSignupButtons />
    </div>
  );
};

export default LeftBar;
