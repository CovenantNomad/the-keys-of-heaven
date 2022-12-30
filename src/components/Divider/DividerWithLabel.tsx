import React from 'react'

interface DividerWithLabelProps {
  label: string
}

const DividerWithLabel = ({ label }: DividerWithLabelProps) => {
  return (
    <div className="relative my-8 w-full">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-sm text-gray-500">{label}</span>
      </div>
    </div>
  )
}

export default DividerWithLabel
