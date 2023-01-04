import Navbar from '@components/Navbar'
import React from 'react'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="w-full max-w-xl mx-auto rounded-md shadow-md md:border">
      <Navbar />
      {children}
      <Toaster />
    </main>
  )
}

export default Layout
