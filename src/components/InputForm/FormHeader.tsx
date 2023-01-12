import React, { Dispatch, SetStateAction } from 'react'
import { UserType } from 'src/types/types'

interface FormHeaderProps {
  title: string
  user: UserType | null
  setOepn: Dispatch<SetStateAction<boolean>>
}

const FormHeader = ({ title, user, setOepn }: FormHeaderProps) => {
  return (
    <div className="flex items-center justify-between py-6">
      <button
        onClick={() => setOepn(false)}
        type="button"
        className="font-medium"
      >
        취소
      </button>
      <h3 className="text-lg">{title}</h3>
      <button
        type="submit"
        disabled={!user}
        className="text-teal-600 font-medium"
      >
        완료
      </button>
    </div>
  )
}

export default FormHeader
