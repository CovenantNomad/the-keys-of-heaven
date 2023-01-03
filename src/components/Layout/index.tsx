import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="h-screen w-full max-w-xl mx-auto rounded-md shadow-md overflow-hidden md:max-w-3xl md:border">
      <Navbar />
      <section className={`relative h-full`}>{children}</section>
      <Toaster />
    </main>
  )
}

export default Layout
