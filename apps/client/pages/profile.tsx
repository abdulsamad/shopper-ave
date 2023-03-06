import React from 'react';
import type { NextPage } from 'next';
import dayjs from 'dayjs';

import { useUser } from '@store/index';

const ProfilePage: NextPage = () => {
  const user = useUser();

  return (
    <section className="my-5 flex flex-1 flex-col items-center justify-center space-y-3">
      <div>
        <span className="mr-2 font-semibold">Name:</span>
        <span>{user.name}</span>
      </div>
      <div>
        <span className="mr-2 font-semibold">Email:</span>
        <span>{user.email}</span>
      </div>
      <div>
        <span className="mr-2 font-semibold">Role:</span>
        <span className="uppercase">{user.role}</span>
      </div>
      <div>
        <span className="mr-2 font-semibold">Account Creation On:</span>
        <span>{dayjs(user.createdAt).format('DD MMM YYYY')}</span>
      </div>
    </section>
  );
};

export default ProfilePage;
