import DeclarationForm from '@components/InputForm/DeclarationForm'
import Layout from '@components/Layout'
import Spinner from '@components/Spinner'
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { debounce } from 'lodash'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useQuery, useQueryClient } from 'react-query'
import { db } from 'src/config/firebaseConfig'
import useAuthState from 'src/hooks/useAuthState'
import { findDeclaration } from 'src/lib/declarations'
import { DeclarationFormType, TestimonyType } from 'src/types/types'
import { formatDate } from 'src/utils'
import Alert from '@components/Alert'

interface DetailProps {}

const Detail = ({}: DetailProps) => {
  const [openAlert, setOpenAlert] = useState(false)
  const [openInput, setOpenInput] = useState(false)
  const [count, setCount] = useState<number>(0)
  const [editMode, setEditMode] = useState(false)
  const [docId, setDocId] = useState<string | undefined>(undefined)
  const [user] = useAuthState()
  const userId = user?.uid
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TestimonyType>()

  const {
    handleSubmit: editHandleSubmit,
    register: editRegister,
    getValues: editGetValeus,
    setValue: editSetValue,
    reset: editReset,
    formState: { errors: editErrors },
  } = useForm<DeclarationFormType>()

  const { isLoading, data } = useQuery(
    ['findDeclaration', [userId, docId]],
    () => findDeclaration(userId!, docId!),
    {
      enabled: !!userId && !!docId,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  )

  const onSubmitHandler = async (form: TestimonyType) => {
    if (userId && docId) {
      const docRef = doc(db, 'users', userId, 'declarations', docId)
      await updateDoc(docRef, {
        testimony: {
          content: form.content,
          createdAt: serverTimestamp(),
        },
      })
      toast.success('예언적 선포문이 작성되었습니다')
      queryClient.invalidateQueries(['findDeclaration', [userId, docId]])
      setOpenInput(false)
    } else {
      toast.error(`로그인 상태가 아닙니다.${'\n'} 로그인 후 진행해주세요.`)
    }
  }

  const onEditsubmitHandler = async (form: DeclarationFormType) => {
    if (user) {
      try {
        if (userId && docId && data) {
          const docRef = doc(db, 'users', userId, 'declarations', docId)

          if (form.tag !== data.tag && form.comments !== data.declaration) {
            await updateDoc(docRef, {
              tag: form.tag,
              declaration: form.comments,
            })
            toast.success('예언적 선포문이 수정되었습니다')
            queryClient.invalidateQueries(['findDeclaration', [userId, docId]])
          } else if (
            form.tag !== data.tag &&
            form.comments === data.declaration
          ) {
            await updateDoc(docRef, {
              tag: form.tag,
            })
            toast.success('예언적 선포문이 수정되었습니다')
            queryClient.invalidateQueries(['findDeclaration', [userId, docId]])
          } else if (
            form.tag === data.tag &&
            form.comments !== data.declaration
          ) {
            await updateDoc(docRef, {
              declaration: form.comments,
            })
            toast.success('예언적 선포문이 수정되었습니다')
            queryClient.invalidateQueries(['findDeclaration', [userId, docId]])
          }
        }
        setEditMode(false)
      } catch (error) {
        console.log(error)
        toast.error('예언적 선포문 수정 중 오류가 발생했습니다.')
      }
    } else {
      toast.error(`로그인 상태가 아닙니다.${'\n'} 로그인 후 작성해 주세요.`)
    }
  }

  const onDeleteHandler = async () => {
    if (user) {
      try {
        if (userId && docId) {
          const docRef = doc(db, 'users', userId, 'declarations', docId)
          await deleteDoc(docRef)
          toast.success('예언적 선포문을 삭제했습니다')
        }
        queryClient.invalidateQueries(['findDeclarations', userId])
        router.push('/declarations')
      } catch (error) {
        console.log(error)
        toast.error('예언적 선포문 삭제 중 오류가 발생했습니다')
      }
    } else {
      toast.error(`로그인 상태가 아닙니다.${'\n'} 로그인 해주세요.`)
    }
  }

  const onCountWord = debounce(() => {
    setCount(editGetValeus().comments.length)
    const maxRow = 8
    const rows = editGetValeus().comments.split('\n').length
    if (rows > maxRow) {
      toast.error('최대 8줄까지 입니다')
      let modifiedText = editGetValeus()
        .comments.split('\n')
        .slice(0, maxRow)
        .join('\n')
      editSetValue('comments', modifiedText)
    }
  }, 300)

  useEffect(() => {
    if (router.query.id !== undefined && typeof router.query.id === 'string') {
      setDocId(router.query.id)
    }
  }, [])

  useEffect(() => {
    if (data) {
      editSetValue('comments', data.declaration)
      editSetValue('tag', data.tag)
      setCount(data.declaration.length)
    }
  }, [data])

  return (
    <Layout>
      <Head>
        <title>천국열쇠 챌린지</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative w-full h-[calc(100%-5rem)] top-20 overflow-y-auto py-6 px-4 flex flex-col">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
          >
            돌아가기
          </button>
        </div>

        {isLoading ? (
          <Spinner />
        ) : data ? (
          <>
            {!editMode ? (
              <div className="py-6 px-4 border rounded-md shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg tracking-wide">2023 My Declaration</h3>
                  <div className="inline-flex gap-x-3">
                    <button
                      onClick={() => setEditMode(!editMode)}
                      type="button"
                      className="font-medium text-teal-600 px-2"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      disabled={!user}
                      onClick={() => setOpenAlert(true)}
                      className="font-medium text-red-600 px-2"
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-x-8 py-3 border-b ">
                    <p className="text-gray-500">태그</p>
                    <p>#{data.tag}</p>
                  </div>
                  <div className="pt-3 pb-6 border-b">
                    <p className="text-gray-500 mb-2">예언적 선포문</p>
                    <p>{data.declaration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 pt-3">
                      {formatDate(data.createdAt.seconds)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 px-4 border rounded-md shadow-sm">
                <DeclarationForm
                  handleSubmit={editHandleSubmit}
                  submitHandler={onEditsubmitHandler}
                  register={editRegister}
                  title={'2023 My Declaration'}
                  user={user}
                  errors={editErrors}
                  count={count}
                  onCountWord={onCountWord}
                  editMode={editMode}
                  getValues={editGetValeus}
                />
              </div>
            )}

            {data.testimony ? (
              <div className="mt-6">
                <h4 className="mb-2 text-lg">나의 간증</h4>
                <div className="border px-4 py-2 rounded-lg shadow-md">
                  <p className="pt-2 pb-4">{data.testimony.content}</p>
                  <p className="border-t py-2 text-sm text-gray-500">
                    2013.01.03
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                {!openInput ? (
                  <button
                    onClick={() => setOpenInput(true)}
                    className="px-4 py-2 bg-teal-500 text-white"
                  >
                    간증문 작성하기
                  </button>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className="w-full"
                  >
                    <div>
                      <label htmlFor="content" className="sr-only">
                        간증문
                      </label>
                      <textarea
                        id="content"
                        rows={10}
                        placeholder={'간증문을 입력해 주세요.'}
                        {...register('content', {
                          required: true,
                        })}
                        className="w-full border pt-3 px-2 focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div className="flex justify-end gap-x-6 mt-2">
                      <button
                        type="reset"
                        className="px-4 py-2 bg-red-500 text-white"
                        onClick={() => {
                          setOpenInput(false)
                          reset({ content: '' })
                        }}
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-teal-500 text-white"
                      >
                        작성완료
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </>
        ) : (
          <p>데이터없음</p>
        )}
      </div>
      {openAlert && (
        <Alert
          open={openAlert}
          setOpen={setOpenAlert}
          onActionHandler={onDeleteHandler}
        />
      )}
    </Layout>
  )
}

export default Detail
