import React from 'react'
import { motion } from 'framer-motion'

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  return (
    <motion.aside
      initial={{
        x: 500,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { duration: 0.4 },
      }}
      exit={{
        x: 500,
        opacity: 0,
        transition: { duration: 0.4 },
      }}
      className="bg-red-100 w-full h-full z-50"
    >
      <ul className="flex flex-col items-end px-8 py-8">
        <li>로그인</li>
        <li>예언적 선포문 보기</li>
        <li>선포모드</li>
        <li>설명</li>
      </ul>
    </motion.aside>
  )
}

export default Sidebar
