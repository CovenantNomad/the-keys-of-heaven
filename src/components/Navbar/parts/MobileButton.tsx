import { Dispatch, SetStateAction } from 'react'
import Close from './Close'
import Hamburger from './Hamburger'

interface MobileButtonProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const MobileButton = ({ open, setOpen }: MobileButtonProps) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={`inline-flex items-center justify-center p-2`}
    >
      <span className="sr-only">Open main menu</span>
      {open ? <Close /> : <Hamburger />}
    </button>
  )
}

export default MobileButton
