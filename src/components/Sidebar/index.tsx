import React from 'react'

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  return (
    <div className="absolute -bottom-20 right-0 bg-red-100 w-full h-full z-[2000]">
      sidebar
    </div>
  )
}

export default Sidebar
