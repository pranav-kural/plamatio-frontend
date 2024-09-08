import {User} from '@/app/types/backend-types';
import {FC} from 'react';

const user: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@g.com',
};

export const UserDetailsSection: FC = () => {
  return (
    <div className="w-full md:min-h-[200px] flex flex-col gap-2 justify-between p-5 border border-violet-800 rounded-lg shadow-lg">
      <h2 className="font-[500]">Your Details</h2>
      <div className="w-full flex flex-row">
        <div className="w-1/2">
          <h2 className="text-gray-500">First Name</h2>
          <p>{user.firstName}</p>
        </div>
        <div className="w-1/2">
          <h2 className="text-gray-500">Last Name</h2>
          <p>{user.lastName}</p>
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-gray-500">Email</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserDetailsSection;
