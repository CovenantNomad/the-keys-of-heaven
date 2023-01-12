import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Backdrop from './parts/Backdrop'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import useAuthState from 'src/hooks/useAuthState'
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore'
import { db } from 'src/config/firebaseConfig'
import { useMutation, useQueryClient } from 'react-query'
import { debounce } from 'lodash'
import DeclarationForm from '@components/InputForm/DeclarationForm'
import { DeclarationFormType } from 'src/types/types'

interface AddModalProps {
  setOepn: Dispatch<SetStateAction<boolean>>
}

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

const AddModal = ({ setOepn }: AddModalProps) => {
  const [count, setCount] = useState<number>(0)
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<DeclarationFormType>()
  const [user] = useAuthState()
  const queryClient = useQueryClient()

  const submitHandler = async (data: DeclarationFormType) => {
    if (user) {
      try {
        await runTransaction(db, async (transition) => {
          const newDeclarationRef = doc(
            collection(db, 'users', user.uid, 'declarations')
          )
          const countRef = doc(db, 'all-declarations', 'totalInfo')
          const countDoc = await transition.get(countRef)

          transition.set(newDeclarationRef, {
            tag: data.tag,
            declaration: data.comments,
            userId: user.uid,
            isDisplayed: true,
            hasTesimony: false,
            initialX: 0,
            initilaY: 0,
            createdAt: serverTimestamp(),
          })

          if (countDoc.exists()) {
            const newCount = countDoc.data().published + 1
            transition.update(countRef, { published: newCount })
            transition.update(countRef, {
              _ref: arrayUnion(newDeclarationRef.id),
            })
          }
        })
        toast.success('예언적 선포문이 작성되었습니다')
        queryClient.invalidateQueries(['findDeclarations', user.uid])
        setOepn(false)
      } catch (error) {
        console.log(error)
        toast.error('예언적 선포문이 작성에 실패하였습니다')
      }
    } else {
      toast.error(`로그인 상태가 아닙니다.${'\n'} 로그인 후 작성해 주세요.`)
      setOepn(false)
    }
  }

  const onCountWord = debounce(() => {
    setCount(getValues().comments.length)
    const maxRow = 8
    const rows = getValues().comments.split('\n').length
    if (rows > maxRow) {
      toast.error('최대 8줄까지 입니다')
      let modifiedText = getValues()
        .comments.split('\n')
        .slice(0, maxRow)
        .join('\n')
      setValue('comments', modifiedText)
    }
  }, 300)

  return (
    <Backdrop onClick={() => setOepn(false)}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-w-[1/3] w-[450px] max-w-[90%] min-h-[40%] max-h-[90%] margin:auto bg-white border border-gray-300 shadow-lg px-6 overflow-y-auto"
      >
        <DeclarationForm
          handleSubmit={handleSubmit}
          submitHandler={submitHandler}
          register={register}
          title={'예언적 선포문 작성'}
          user={user}
          setOpen={setOepn}
          errors={errors}
          count={count}
          onCountWord={onCountWord}
          getValues={getValues}
        />
      </motion.div>
    </Backdrop>
  )
}

export default AddModal
