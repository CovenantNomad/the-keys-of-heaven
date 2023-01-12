import React from 'react'
import { UserType } from 'src/types/types'

interface EditHeaderProps {
  title: string
  user: UserType | null
}

const EditHeader = ({ title, user }: EditHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg">{title}</h3>
      <button
        type="submit"
        disabled={!user}
        className="text-teal-600 font-medium"
      >
        수정완료
      </button>
    </div>
  )
}

export default EditHeader
