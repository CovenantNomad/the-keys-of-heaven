import Image from 'next/image'
import React from 'react'

interface FrontProps {
  isOpen: boolean
}

const Front = ({ isOpen }: FrontProps) => {
  return (
    <div
      style={{ transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      className={`w-full h-full flex flex-col items-center justify-center px-4 bg-[#FFFBEB] duration-500`}
    >
      <Image
        src={'/images/key.png'}
        width={1000}
        height={677}
        alt="천국열쇠 이미지"
        className=""
      />
      <p className="mt-10">
        <strong>SHALOM</strong> INTOUCH
      </p>
    </div>
  )
}

export default Front
