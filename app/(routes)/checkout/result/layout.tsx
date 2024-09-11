import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Checkout Result',
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-start">
      <h1>Checkout Result</h1>
      {children}
    </div>
  );
}
