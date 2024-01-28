'use client';

import React from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { UserButton } from './auth/user-button';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/use-current-user';

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const user = useCurrentUser();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <h1 className={cn("text-3xl font-semibold text-black drop-shadow-lg flex items-center text-center")}>
              <Image src="/libélula.png" width={40} height={40} alt="logo" className="mr-2"/> Li<span className="text-[#2ecc71]">b</span> él
            </h1>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 pl-4 rounded-full bg-[#1c1c1c] flex items-center justify-center text-center text-white">
            <span className='mr-2'>{user?.name}</span>
            <UserButton/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
