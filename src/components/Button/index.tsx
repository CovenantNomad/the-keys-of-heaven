import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps {
  onClick?: () => void
  prime?: boolean
  title: string
  round?: boolean
  type?: 'submit' | 'reset' | 'button'
}

const Button = ({ onClick, prime, title, round, type }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 text-white ${
        prime ? 'bg-teal-500' : 'bg-red-500'
      } ${round ? 'rounded-md' : 'rounded-none'}`}
    >
      {title}
    </button>
  )
}

export default Button
