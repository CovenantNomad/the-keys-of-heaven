import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import { useRecoilState } from 'recoil'
import { sidebarState } from 'src/state/sidebarState'
import MobileButton from './parts/MobileButton'

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  return (
    <div className="fixed h-20 w-full max-w-[35rem] flex justify-between items-center px-4 sm:pr-0 bg-white z-50">
      <Link href={'/'}>
        <h1 className="text-3xl font-berkshire lg:text-5xl">
          The Keys of Heaven
        </h1>
      </Link>
      <div>
        <MobileButton />
      </div>
    </div>
  )
}

export default Navbar
