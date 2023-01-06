import React, { MutableRefObject } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { doc, DocumentData, updateDoc } from 'firebase/firestore'
import { db } from 'src/config/firebaseConfig'
import { inRange } from 'lodash'

interface DraggablePointProps {
  boardRef: React.RefObject<HTMLDivElement>
  index: number
  item: DocumentData
  boardX: MutableRefObject<number>
  boardY: MutableRefObject<number>
  boardWidth: MutableRefObject<number>
  boardHeight: MutableRefObject<number>
  onClickHandler: () => void
}

const DraggablePoint = ({
  boardRef,
  index,
  item,
  boardX,
  boardY,
  boardWidth,
  boardHeight,
  onClickHandler,
}: DraggablePointProps) => {
  return (
    <motion.div
      drag
      dragConstraints={boardRef}
      style={{
        left: item.initialX * boardWidth.current,
        top: item.initialY * boardHeight.current,
      }}
      // onDrag={() => setIsDragging(true)}
      // onDragTransitionEnd={() => setIsDragging(false)}
      onDragEnd={async (event, info) => {
        const valueX =
          Math.round(
            ((info.point.x - boardX.current) / boardWidth.current) * 1000
          ) / 1000
        const valueY =
          Math.round(
            ((info.point.y - boardY.current) / boardHeight.current) * 1000
          ) / 1000
        const docRef = doc(
          db,
          'users',
          item.userId,
          'declarations',
          item.documentId
        )
        await updateDoc(docRef, {
          initialX: valueX <= 0 ? 0.1 : valueX >= 1 ? 0.9 : valueX,
          initialY: valueY <= 0 ? 0 : valueY >= 1 ? 0.9 : valueY,
        })
      }}
      whileTap={{ cursor: 'grabbing' }}
      onClick={onClickHandler}
      className={`relative w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center`}
    >
      <div className="text-white">{index}</div>
      <div
        className={`
          absolute 
          ${
            item.initialX <= 0.25 || inRange(item.initialX, 0.51, 0.75)
              ? 'left-10 rounded-br-xl'
              : 'right-10 rounded-bl-xl'
          }
          bottom-[calc(2.5rem-0.75rem)]  w-20 px-2 py-2  text-sm bg-yellow-400 text-center text-white rounded-tr-xl rounded-tl-xl `}
      >
        {item.tag}
      </div>
    </motion.div>
  )
}

export default DraggablePoint
