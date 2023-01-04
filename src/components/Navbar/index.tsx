import React, { Dispatch, SetStateAction } from 'react'
import { useRecoilState } from 'recoil'
import { sidebarState } from 'src/state/sidebarState'
import MobileButton from './parts/MobileButton'

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  return (
    <div className="relative h-20 flex justify-between items-center px-4 ">
      <h1 className="text-3xl font-berkshire lg:text-5xl">
        The Keys of Heaven
      </h1>
      <div className="flex items-center">
        <MobileButton />
      </div>
    </div>
  )
}

export default Navbar
