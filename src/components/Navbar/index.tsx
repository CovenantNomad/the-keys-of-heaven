import React, { Dispatch, SetStateAction } from 'react'
import { useRecoilState } from 'recoil'
import { sidebarState } from 'src/state/sidebarState'
import MobileButton from './parts/MobileButton'

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const [open, setOpen] = useRecoilState(sidebarState)

  return (
    <div className="relative h-20 flex justify-between items-center px-4 ">
      <div className="text-3xl font-berkshire lg:text-5xl">
        The Keys of Heaven
      </div>
      <div className="flex items-center">
        <MobileButton open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default Navbar
