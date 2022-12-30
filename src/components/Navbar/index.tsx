import Avatar from '@components/Avatar'
import Sidebar from '@components/Sidebar'
import React, { useState } from 'react'
import MobileButton from './parts/MobileButton'

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative h-20 flex justify-between items-center px-4 ">
      <Avatar />
      <div className="text-3xl font-berkshire lg:text-5xl">
        The Keys of Heaven
      </div>
      <div className="flex items-center">
        <MobileButton open={open} setOpen={setOpen} />
      </div>
      {open && <Sidebar />}
    </div>
  )
}

export default Navbar
