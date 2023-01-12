import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import { useRecoilState } from 'recoil'
import { sidebarState } from 'src/state/sidebarState'
import MobileButton from './parts/MobileButton'

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  return (
    <div className="fixed top-0 left-0 h-20 w-full max-w-xl flex justify-between items-center px-4 bg-white z-30">
      <Link href={'/'}>
        <h1 className="text-2xl font-berkshire lg:text-4xl">
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
