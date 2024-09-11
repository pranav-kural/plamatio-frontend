import {SignIn} from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <SignIn />
    </div>
  );
}
