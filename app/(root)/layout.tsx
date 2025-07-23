import Link from 'next/link'
import React, { ReactNode } from 'react'
import Image from "next/image";
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/ui/LogoutButton';

const RootLayout = async ({children} : {children : ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated) redirect('/sign-in');
  
  return (
    <div className='root-layout'>
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex item-center gap-2 items-center">
        <Image src="/logo.png" alt="Logo" width={58} height={52} />
          <h2 className="text-primary-100">InterviewWise</h2>
        </Link>
        <LogoutButton />
      </nav>
      {children}
    </div>
  )
}

export default RootLayout