import Link from 'next/link';
import {FC} from 'react';

export const DemoHeadline: FC = () => {
  return (
    <div className="w-full py-2 bg-violet-900 text-violet-300 text-sm text-center">
      <p className="text-center">
        This project is for demonstration purposes only. For more information,
        check{' '}
        <Link
          href="https://www.pkural.ca/projects/#plamatio-e-commerce"
          className="underline hover:font-[500]">
          here
        </Link>
        .
      </p>
    </div>
  );
};

export default DemoHeadline;
