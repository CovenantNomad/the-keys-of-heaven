import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { useMutation } from 'react-query'

interface AddModalProps {
  setOepn: Dispatch<SetStateAction<boolean>>
}

interface FormType {
  tag: string
  comments: string
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
  } = useForm<FormType>()
  const [user] = useAuthState()

  const submitHandler = async (data: FormType) => {
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

  const onCountWord = () => {
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
  }

  return (
    <Backdrop onClick={() => setOepn(false)}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-w-[1/3] w-[450px] max-w-[90%] min-h-[50%] max-h-[90%] margin:auto bg-white border border-gray-300 shadow-lg px-6 overflow-y-auto"
      >
        <form onSubmit={handleSubmit(submitHandler)} className="w-full">
          <div className="flex items-center justify-between py-6">
            <button
              onClick={() => setOepn(false)}
              type="button"
              className="font-medium"
            >
              취소
            </button>
            <h3 className="text-lg">예언적 선포문 작성</h3>
            <button
              type="submit"
              disabled={!user}
              className="text-teal-600 font-medium"
            >
              완료
            </button>
          </div>

          <div className="mt-5">
            <div className="relative">
              <label htmlFor="tag" className="sr-only">
                태그
              </label>
              <input
                id="tag"
                placeholder={'태그를 입력해 주세요. (최대 20자)'}
                maxLength={20}
                {...register('tag', {
                  required: true,
                })}
                className="w-full border-b py-3 focus:outline-none focus:ring-primary focus:border-primary"
              />
              {errors.tag && (
                <p className="absolute -top-3 left-0 text-red-600 bg-white w-full">
                  태그를 입력해야 합니다
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="comments" className="sr-only">
                예언적 선포문
              </label>
              <textarea
                id="comments"
                rows={8}
                maxLength={200}
                onKeyUp={onCountWord}
                placeholder={'예언적 선포문을 입력해 주세요. (최대 200자)'}
                {...register('comments', {
                  required: true,
                })}
                className="w-full border-b pt-3 pb-8 focus:outline-none focus:ring-primary focus:border-primary"
              />
              <span className="inline-block absolute bottom-1 right-2">
                {count}/200
              </span>
              {errors.tag && (
                <p className="absolute top-10 left-0 text-red-600 bg-white w-full">
                  예언적 선포문을 입력해야 합니다
                </p>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  )
}

export default AddModal
