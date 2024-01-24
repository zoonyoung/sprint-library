import { UserType } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import React from 'react';

export default function Avatar({ user }: { user: UserType }) {
  return (
    <div className='p-[0.1rem] bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 rounded-full'>
      <Image
        className='rounded-full'
        src={user?.image}
        alt='userImage'
        width={60}
        height={60}
      />
    </div>
  );
}
