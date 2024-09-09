'use client';
import {SignUp} from '@clerk/nextjs';
export default function SignUpPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <SignUp />
    </div>
  );
}
