import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import dayjs from 'dayjs';

import { useUser } from '@store/index';
import { generateAvatar } from '@utils/index';

const ProfilePage: NextPage = () => {
  const user = useUser();

  const avatar = useMemo(() => {
    if (!user) return '';

    return generateAvatar(user.name, 300);
  }, [user]);

  if (!user) return null;

  const { name, email, role, createdAt } = user;

  return (
    <section className="my-5 flex flex-1 flex-col items-center justify-center">
      <div className="mb-16">
        <Image
          width={300}
          height={300}
          src={user.photo ? user.photo.secure_url : avatar}
          alt={name}
          className="rounded-full object-cover"
        />
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
