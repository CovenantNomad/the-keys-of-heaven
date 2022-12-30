import React from 'react'

interface BackProps {
  isOpen: boolean
}

const Back = ({ isOpen }: BackProps) => {
  return (
    <div
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'rotateY(0deg)' : 'rotateY(-180deg)',
      }}
      className={`absolute top-0 left-0 w-full h-full duration-500 bg-[#FEFBF6] flex flex-col items-center py-6 px-4`}
    >
      <h2 className="text-xl font-bold font-serif">2023 My Declaration</h2>
      <p className="mt-4 border h-full p-4">
        Good tools make application development quicker and easier to maintain
        than if you did everything by hand
      </p>
    </div>
  )
}

export default Back
