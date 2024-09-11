'use client';

export default function Error({error}: {error: Error}) {
  return (
    <div className="w-full flex flex-col gap-5 p-5 items-center justify-center">
      <h2 className="text-red-700">Oops! Seems like there is an issue.</h2>
      <span>{error.message}</span>
    </div>
  );
}
