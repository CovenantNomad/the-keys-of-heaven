import React, { useCallback, useState } from 'react'
import { motion, useDragControls, useMotionValue } from 'framer-motion'
import Front from './parts/Front'
import Back from './parts/Back'

interface CardMotionProps {
  boardRef: React.RefObject<HTMLDivElement>
  initialX: number
  initialY: number
}

const CardMotion = ({ boardRef, initialX, initialY }: CardMotionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dragging, setIsDragging] = useState(false)

  const onClickHandler = (event: React.SyntheticEvent) => {
    if (dragging) {
      event.stopPropagation()
      return
    } else {
      setIsOpen(!isOpen)
    }
  }

  return (
    <motion.div
      drag
      dragConstraints={boardRef}
      style={{ x: initialX, y: initialY }}
      onDrag={() => setIsDragging(true)}
      onDragTransitionEnd={() => setIsDragging(false)}
      onClick={onClickHandler}
      className="group absolute w-10 h-10 rounded-full bg-red-100 flex items-center justify-center lg:w-[250px] lg:h-[300px] lg:bg-inherit lg:rounded-none"
    >
      <div className="group-hover:hidden lg:hidden">1</div>
      <div className="hidden group-hover:block group-hover:duration-1000 group-hover:ease-out lg:block lg:w-full lg:h-full">
        <div className="relative w-[250px] h-[300px] shadow-md">
          <Front isOpen={isOpen} />
          <Back isOpen={isOpen} />
        </div>
      </div>
    </motion.div>
  )
}

export default CardMotion
