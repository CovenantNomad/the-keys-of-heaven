import React, { Dispatch, SetStateAction } from 'react'
import Backdrop from './parts/Backdrop'
import { motion } from 'framer-motion'
import useAuthState from 'src/hooks/useAuthState'
import { SelectedDeclarationType } from 'src/types/types'

interface ReadModalProps {
  setOepn: Dispatch<SetStateAction<boolean>>
  selectedDeclaration: SelectedDeclarationType | null
}

// const dropIn = {
//   hidden: {
//     y: '-100vh',
//     opacity: 0,
//   },
//   visible: {
//     y: '0',
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//       type: 'spring',
//       damping: 25,
//       stiffness: 500,
//     },
//   },
//   exit: {
//     y: '100vh',
//     opacity: 0,
//   },
// }

const ReadModal = ({ setOepn, selectedDeclaration }: ReadModalProps) => {
  const [user] = useAuthState()

  return (
    <Backdrop onClick={() => setOepn(false)}>
      <div
        // onClick={(e) => e.stopPropagation()}
        className="relative min-w-[1/3] w-[450px] max-w-[90%] min-h-[50%] max-h-[90%] margin:auto bg-white border border-gray-300 shadow-lg px-6 overflow-y-auto"
      >
        <button
          onClick={() => setOepn(false)}
          className="absolute top-6 left-6"
        >
          닫기
        </button>
        <div className="flex items-center justify-center pt-6">
          <h3 className="text-lg">2023 My Declaration</h3>
        </div>

        {selectedDeclaration !== null && (
          <div className="mt-6">
            <div className="flex items-center gap-x-8 py-3 border-b ">
              <p className="text-gray-500">태그</p>
              <p>#{selectedDeclaration.tag}</p>
            </div>
            <div className="pt-3 pb-6">
              <p className="text-gray-500 mb-2">예언적 선포문</p>
              <p>{selectedDeclaration.declaration}</p>
            </div>
          </div>
        )}
      </div>
    </Backdrop>
  )
}

export default ReadModal
