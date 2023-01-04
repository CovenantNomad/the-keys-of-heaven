import React from 'react'
import { motion } from 'framer-motion'

interface BackdropProps {
  children: JSX.Element
  onClick: () => void
}

const Backdrop = ({ children, onClick }: BackdropProps) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 h-full w-full flex justify-center items-center"
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
