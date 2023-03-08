import React, { useLayoutEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dayjs from 'dayjs';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

import { useAuthActions, useUser } from '@store/index';
import Button from '@utils/Button';

const ProfilePage: NextPage = () => {
  const user = useUser();
  const actions = useAuthActions();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  const { name, email, role, createdAt } = user;

  return (
    <section className="my-5 flex flex-1 flex-col items-center justify-center">
      <div className="mb-16">
        {user.photo && (
          <Image
            width={300}
            height={300}
            src={user.photo?.secure_url}
            alt={name}
            className="rounded-full object-cover"
          />
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
        <Button className="bg-slate-100" onClick={() => actions.logout()}>
          <ArrowLeftOnRectangleIcon className="mr-2 h-6 w-6" />
          Logout
        </Button>
      </div>
    </section>
  );
};

export default ProfilePage;
