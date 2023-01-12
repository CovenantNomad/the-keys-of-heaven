import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps {
  onClick?: () => void
  color: string
  title: string
  round?: boolean
  type?: 'submit' | 'reset' | 'button'
}

const Button = ({ onClick, color, title, round, type }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 text-white bg-${color}-500 ${
        round ? 'rounded-md' : 'rounded-none'
      }`}
    >
      {title}
    </button>
  )
}

export default Button
