import { Dispatch, SetStateAction } from 'react'
import { useRecoilState } from 'recoil'
import { sidebarState } from 'src/state/sidebarState'
import Close from './Close'
import Hamburger from './Hamburger'

interface MobileButtonProps {}

const MobileButton = ({}: MobileButtonProps) => {
  const [open, setOpen] = useRecoilState(sidebarState)

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
