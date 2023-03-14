import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import dayjs from 'dayjs';

import { useUser } from '@store/index';

const ProfilePage: NextPage = () => {
  const user = useUser();

  if (!user) return null;

  const { name, email, role, createdAt } = user;

  return (
    <section className="my-5 flex flex-1 flex-col items-center justify-center">
      <div className="mb-16">
        {user.photo ? (
          <Image
            width={300}
            height={300}
            src={user.photo?.secure_url}
            alt={name}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="bg-primary-200 flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-full">
            <div className="text-6xl">{name.substring(0, 1)}</div>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-4 text-center">
        <div>
          <span className="mr-2 font-semibold">Name:</span>
          <span>{name}</span>
        </div>
        <div>
          <span className="mr-2 font-semibold">Email:</span>
          <span>{email}</span>
        </div>
        <div>
          <span className="mr-2 font-semibold">Role:</span>
          <span className="uppercase">{role}</span>
        </div>
        <div>
          <span className="mr-2 font-semibold">Created On:</span>
          <span>{dayjs(createdAt).format('DD MMM YYYY')}</span>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
