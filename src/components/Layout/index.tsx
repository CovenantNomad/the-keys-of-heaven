import Navbar from '@components/Navbar'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  auth?: boolean
}

const Layout = ({ children, auth }: LayoutProps) => {
  return (
    <main className="h-screen w-full max-w-xl mx-auto rounded-md shadow-md overflow-hidden md:max-w-3xl md:border">
      {!auth && <Navbar />}
      <div className={`${auth ? '' : 'relative px-4 py-8 h-full'}`}>
        {children}
      </div>
    </main>
  )
}

export default Layout
