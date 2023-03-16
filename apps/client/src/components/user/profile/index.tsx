import React, { useMemo } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { User } from 'shared-types';

import { roleBadges } from '@utils/Badges';
import { generateAvatar } from '@utils/index';
import Button from '@utils/Button';

interface IProfile extends User {
  toggleEditMode: () => void;
}

const Profile = ({ name, email, role, createdAt, photo, toggleEditMode }: IProfile) => {
  const avatar = useMemo(() => {
    if (!name) return '';

    return generateAvatar(name, 300);
  }, [name]);

  return (
    <>
      <div className="mb-16">
        <Image
          width={300}
          height={300}
          src={photo ? photo.secure_url : avatar}
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
          {roleBadges[role]}
        </div>
        <div>
          <span className="mr-2 font-semibold">Created On:</span>
          <span>{dayjs(createdAt).format('DD MMM YYYY')}</span>
        </div>
      </div>
      <Button className="bg-info my-7 p-2 text-white" onClick={toggleEditMode}>
        <PencilSquareIcon className="mr-2 h-6 w-6" />
        Update Profile
      </Button>
    </>
  );
};

export default Profile;
