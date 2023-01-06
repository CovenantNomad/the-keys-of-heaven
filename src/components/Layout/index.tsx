import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useRecoilValue } from 'recoil'
import { sidebarState } from 'src/state/sidebarState'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const sidebarOpen = useRecoilValue(sidebarState)
  return (
    <main className="h-screen w-full max-w-xl mx-auto sm:rounded-md sm:shadow-md sm:border">
      <Navbar />
      <section className="relative h-[calc(100vh-80px)] top-20">
        {sidebarOpen && <Sidebar />}
        {children}
      </section>
      <Toaster />
    </main>
  )
}

export default Layout
