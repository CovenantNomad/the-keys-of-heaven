import Image from 'next/image'
import React from 'react'

interface FloatingActionButtonProps {}

const FloatingActionButton = ({}: FloatingActionButtonProps) => {
  return (
    <button className="absolute bottom-10 right-6 w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center">
      <span className="text-4xl -translate-y-[5%]">+</span>
    </button>
  )
}

export default FloatingActionButton
