import { UserType } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import React from 'react';

export default function Avatar({ user }: { user: UserType }) {
  return (
    <Image
      className='rounded-full border-2 border-purple-600 hover:scale-95'
      src={user?.image}
      alt='userImage'
      width={60}
      height={60}
    />
  );
}
