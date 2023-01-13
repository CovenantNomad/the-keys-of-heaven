import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import React, { useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import { useRecoilValue } from 'recoil'
import { useWindowSize } from 'src/hooks/useWindowSize'
import { sidebarState } from 'src/state/sidebarState'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const sidebarOpen = useRecoilValue(sidebarState)

  return (
    <main
      className={`w-full max-w-xl h-screen sm:mx-auto sm:rounded-md sm:shadow-md sm:border sm:absolute sm:left-[50%] sm:-translate-x-[50%]`}
    >
      <Navbar />
      {sidebarOpen && <Sidebar />}
      {children}
      <Toaster />
    </main>
  )
}

export default Layout
