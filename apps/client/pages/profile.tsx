import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';

import { useUser } from '@store/index';

import Profile from '@components/user/profile';
import EditMode from '@components/user/profile/EditMode';
import Addresses from '@components/user/profile/Addresses';

const ProfilePage: NextPage = () => {
  const user = useUser();
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setEditMode((prevState) => !prevState);
  }, []);

  if (!user) return null;

  return (
    <div className="my-5 mx-5 flex flex-1 flex-col items-center justify-center space-y-8">
      <section className="w-full max-w-[600px] rounded-2xl border border-solid border-slate-100 p-6 text-center shadow">
        {editMode ? (
          <EditMode toggleEditMode={toggleEditMode} {...user} />
        ) : (
          <Profile toggleEditMode={toggleEditMode} {...user} />
        )}
      </section>
      <section className="w-full max-w-[600px] rounded-2xl border border-solid border-slate-100 p-6 text-center shadow">
        <Addresses addresses={user.addresses} />
      </section>
    </div>
  );
};

export default ProfilePage;
