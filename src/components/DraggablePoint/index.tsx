import React from 'react'
import { motion } from 'framer-motion'

interface DraggablePointProps {
  boardRef: React.RefObject<HTMLDivElement>
  initialX: number
  initialY: number
  index: number
  tag: string
  onClickHandler: () => void
}

const DraggablePoint = ({
  boardRef,
  initialX,
  initialY,
  index,
  tag,
  onClickHandler,
}: DraggablePointProps) => {
  return (
    <motion.div
      drag
      dragConstraints={boardRef}
      style={{ x: initialX, y: initialY }}
      // onDrag={() => setIsDragging(true)}
      // onDragTransitionEnd={() => setIsDragging(false)}
      onClick={onClickHandler}
      className="relative w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center"
    >
      <div className="text-white">{index}</div>
      {/* <div className='absolute -top-8 -right-4 px-3 py-2 rounded-tr-xl rounded-tl-xl rounded-bl-xl text-sm bg-yellow-400 '>{tag}</div> */}
    </motion.div>
  )
}

export default DraggablePoint
