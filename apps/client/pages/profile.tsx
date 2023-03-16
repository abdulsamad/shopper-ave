import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';

import { useUser } from '@store/index';

import Profile from '@components/user/profile';
import EditMode from '@components/user/profile/EditMode';

const ProfilePage: NextPage = () => {
  const user = useUser();
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setEditMode((prevState) => !prevState);
  }, []);

  if (!user) return null;

  return (
    <section className="my-5 flex flex-1 flex-col items-center justify-center">
      {editMode ? (
        <EditMode toggleEditMode={toggleEditMode} {...user} />
      ) : (
        <Profile toggleEditMode={toggleEditMode} {...user} />
      )}
    </section>
  );
};

export default ProfilePage;
