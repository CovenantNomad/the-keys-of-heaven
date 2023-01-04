import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'
import useAuthState from 'src/hooks/useAuthState'

interface FloatingActionButtonProps {
  setOepn: Dispatch<SetStateAction<boolean>>
}

const FloatingActionButton = ({ setOepn }: FloatingActionButtonProps) => {
  const [user] = useAuthState()

  const onClickHandler = () => {
    if (user) {
      setOepn(true)
    } else {
      toast.error('로그인 후 작성해 주세요.')
    }
  }

  return (
    <button
      onClick={onClickHandler}
      className="absolute bottom-10 right-6 w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center"
    >
      <span className="text-4xl -translate-y-[5%]">+</span>
    </button>
  )
}

export default FloatingActionButton
