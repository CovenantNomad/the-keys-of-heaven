import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { debounce } from 'lodash'

interface CardProps {
  children: React.ReactNode
  onMove: (x: number, y: number) => void
  x?: number
  y?: number
  initialTop: React.MutableRefObject<number>
  initialLeft: React.MutableRefObject<number>
}

const Card = ({
  children,
  onMove,
  x = 0,
  y = 0,
  initialTop,
  initialLeft,
}: CardProps) => {
  const dragRef = useRef<HTMLDivElement>(null)
  const initialX = useRef(0)
  const initialY = useRef(0)
  const [position, setPosition] = useState({ x, y })

  const move = useMemo(() => debounce((x, y) => onMove(x, y), 500), [onMove])

  const onMouseMove: { (event: MouseEvent): void } = useCallback(
    (event) => {
      setPosition({
        x: event.clientX - initialX.current - initialLeft.current,
        y: event.clientY - initialX.current - initialTop.current,
      })
      move(
        event.clientX - initialX.current - initialLeft.current,
        event.clientY - initialY.current - initialTop.current
      )
    },
    [move]
  )

  const removeEvents = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', removeEvents)
    document.body.removeEventListener('mouseleave', removeEvents)
  }, [onMouseMove])

  const onMouseDown: { (event: MouseEvent): void } = useCallback(
    (event) => {
      if (dragRef.current !== null) {
        const { left, top } = dragRef.current.getBoundingClientRect()
        console.log('처음 객체위치: ', left, top)
        initialX.current = event.clientX - left
        initialX.current = event.clientY - top
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', removeEvents)
        document.body.addEventListener('mouseleave', removeEvents)
      }
    },
    [onMouseMove, removeEvents]
  )

  useEffect(() => {
    const handle = dragRef.current
    handle?.addEventListener('mousedown', onMouseDown)
    return () => {
      handle?.removeEventListener('mousedown', onMouseDown)
    }
  }, [dragRef, onMouseDown])

  return (
    <div
      ref={dragRef}
      className="absolute w-48 h-60 border shadow-sm select-none bg-white"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </div>
  )
}

export default Card
