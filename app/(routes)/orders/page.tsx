'use client';
import DetailedOrdersView from '@/app/components/orders/DetailedOrdersView';
import {LoadingSpinner} from '@/app/components/ui/LoadingSpinner';
import {useUser} from '@clerk/nextjs';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';
import {useEffect} from 'react';

export default function AllOrdersPage() {
  const {isLoaded, user} = useUser();

  // Record all orders page load event
  useEffect(() => {
    if (user) {
      dispatchUserEvent({
        user_id: user.id,
        event_type: 'page_load',
        core_component: 'all_orders_page',
        description: `Loaded all orders page for user ${user.id}`,
      });
    }
  }, [user]);

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
