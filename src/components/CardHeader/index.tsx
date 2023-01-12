import React from 'react'
import { UserType } from 'src/types/types'

interface CardHeaderProps {
  title: string
  user: UserType
  onEditClick: () => void
  onDeleteClick: () => void
}

const CardHeader = ({
  title,
  user,
  onEditClick,
  onDeleteClick,
}: CardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg tracking-wide">{title}</h3>
      <div className="inline-flex gap-x-3">
        <button
          onClick={onEditClick}
          type="button"
          className="font-medium text-teal-600 px-2"
        >
          수정
        </button>
        <button
          type="button"
          disabled={!user}
          onClick={onDeleteClick}
          className="font-medium text-red-600 px-2"
        >
          삭제
        </button>
      </div>
    </div>
  )
}

export default CardHeader
