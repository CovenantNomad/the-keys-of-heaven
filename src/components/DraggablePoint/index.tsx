import React, { MutableRefObject, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { doc, DocumentData, updateDoc } from 'firebase/firestore'
import { db } from 'src/config/firebaseConfig'
import { debounce, inRange } from 'lodash'

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
  const circleRef = useRef<HTMLDivElement>(null)

  const circleX = useRef(0)
  const circleY = useRef(0)

  // useEffect(() => {
  //   if (circleRef.current !== null) {
  //     const { x, y } = circleRef.current.getBoundingClientRect()
  //     circleX.current = x
  //     circleY.current = y
  //   }
  // }, [])

  return (
    <motion.div
      ref={circleRef}
      drag
      dragConstraints={boardRef}
      style={{
        left: Math.round(item.initialX * boardWidth.current * 1000) / 1000,
        top: Math.round(item.initialY * boardHeight.current * 1000) / 1000,
      }}
      // onDrag={() => setIsDragging(true)}
      // onDragTransitionEnd={() => setIsDragging(false)}
      onDragEnd={debounce(async () => {
        if (circleRef.current !== null) {
          const { x, y } = circleRef.current.getBoundingClientRect()
          console.log('X 위치:', x, 'Y 위치:', y)
          circleX.current =
            x <= boardX.current
              ? boardX.current
              : x >= boardWidth.current
              ? boardWidth.current - 40
              : x
          circleY.current =
            y <= boardY.current
              ? boardY.current
              : y >= boardY.current + boardHeight.current
              ? boardY.current + boardHeight.current - 40
              : y
        }

        console.log(
          '계산된 X 위치:',
          circleX.current,
          '계산된 Y 위치:',
          circleY.current
        )
        console.log(
          '보더 X 위치: ',
          boardX.current,
          '보더 Y 위치: ',
          boardY.current
        )
        console.log(
          '보더 넓이: ',
          boardWidth.current,
          '보더 높이:',
          boardHeight.current
        )

        // console.log(Math.round(((circleX.current - boardX.current) / boardWidth.current) * 1000) / 1000)

        const valueX =
          Math.round(
            ((circleX.current - boardX.current) / boardWidth.current) * 1000
          ) / 1000
        const valueY =
          Math.round(
            ((circleY.current - boardY.current) / boardHeight.current) * 1000
          ) / 1000

        const docRef = doc(
          db,
          'users',
          item.userId,
          'declarations',
          item.documentId
        )

        await updateDoc(docRef, {
          initialX: valueX,
          initialY: valueY,
        })
      }, 500)}
      whileTap={{ cursor: 'grabbing' }}
      onClick={onClickHandler}
      className={`absolute w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center`}
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
          bottom-[calc(2.5rem-0.75rem)] w-20 px-2 py-2  text-sm bg-yellow-400 text-center text-white rounded-tr-xl rounded-tl-xl `}
      >
        {item.tag}
      </div>
    </motion.div>
  )
}

export default DraggablePoint
