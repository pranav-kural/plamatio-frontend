'use client';
import {useUser} from '@clerk/nextjs';
import {FC} from 'react';
import {CreateUser} from './CreateUser';

export const CreateUserBridge: FC = () => {
  const {isLoaded, isSignedIn, user} = useUser();

  return (
    <>
      {isLoaded && isSignedIn && user && (
        <CreateUser
          user={{
            id: user.id,
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            email: user.emailAddresses[0]?.emailAddress,
          }}
        />
      )}
    </>
  );
};
