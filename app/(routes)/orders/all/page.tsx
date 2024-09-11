'use client';
import DetailedOrdersView from '@/app/components/orders/DetailedOrdersView';
import {LoadingSpinner} from '@/app/components/ui/loading-spinner';
import {useUser} from '@clerk/nextjs';

export default function AllOrdersPage() {
  const {isLoaded, user} = useUser();

  return (
    <>
      <div className="w-full max-w-[1620px] h-full px-5 md:px-20">
        {!isLoaded && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <LoadingSpinner label="Loading user data..." />
          </div>
        )}
        {isLoaded && user && <DetailedOrdersView userId={user.id} />}
      </div>
    </>
  );
}
