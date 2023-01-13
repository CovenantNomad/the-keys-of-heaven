import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  arrayRemove,
  deleteDoc,
  deleteField,
  doc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from 'src/config/firebaseConfig'
import { debounce } from 'lodash'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useQuery, useQueryClient } from 'react-query'
import useAuthState from 'src/hooks/useAuthState'
import { DeclarationFormType, TestimonyFormType } from 'src/types/types'
import { findDeclaration } from 'src/lib/declarations'
import { countRef } from 'src/lib/totalCount'
import Alert from '@components/Alert'
import Button from '@components/Button'
import Testimony from '@components/Testimony'
import CardHeader from '@components/CardHeader'
import Declaration from '@components/Declaration/Declaration'
import DeclarationForm from '@components/InputForm/DeclarationForm'
import Layout from '@components/Layout'
import Spinner from '@components/Spinner'
import TestimonyForm from '@components/InputForm/TestimonyForm'
import { NextPageContext } from 'next'

interface DetailProps {
  docId: string
}

const Detail = ({ docId }: DetailProps) => {
  const router = useRouter()
  const [openAlert, setOpenAlert] = useState(false)
  const [openTestimonyAlert, setOpenTestimonyAlert] = useState(false)
  const [openInput, setOpenInput] = useState(false)
  const [count, setCount] = useState<number>(0)
  const [editMode, setEditMode] = useState(false)
  const [testimonyEditMode, setTestimonyEditMode] = useState(false)
  const [user, _, isLoading] = useAuthState()
  const userId = user?.uid
  const queryClient = useQueryClient()

  const {
    handleSubmit: testimonyHandleSubmit,
    register: testimonyRegister,
    getValues: testimonyGetValues,
    setValue: testimonySetValue,
    reset: testimonyReset,
    formState: { errors: testimonyErrors },
  } = useForm<TestimonyFormType>()

  const {
    handleSubmit: editHandleSubmit,
    register: editRegister,
    getValues: editGetValeus,
    setValue: editSetValue,
    reset: editReset,
    formState: { errors: editErrors },
  } = useForm<DeclarationFormType>()

  const { isLoading: dataLoading, data } = useQuery(
    ['findDeclaration', [userId, docId]],
    () => findDeclaration(userId!, docId!),
    {
      enabled: !!userId && !!docId,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  )

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

  const onDeleteHandler = useCallback(async () => {
    if (user) {
      try {
        await runTransaction(db, async (transition) => {
          if (userId && docId) {
            const docRef = doc(db, 'users', userId, 'declarations', docId)
            await deleteDoc(docRef)
            toast.success('예언적 선포문을 삭제했습니다')
          }

          const countDoc = await transition.get(countRef)

          if (countDoc.exists()) {
            const newCount = countDoc.data().published - 1
            transition.update(countRef, { published: newCount })
            transition.update(countRef, {
              _ref: arrayRemove(docId),
            })
          }
        })

        queryClient.invalidateQueries(['findDeclarations', userId])
        queryClient.invalidateQueries('getTotalCount')
        router.push('/declarations')
      } catch (error) {
        console.log(error)
        toast.error('예언적 선포문 삭제 중 오류가 발생했습니다')
      }
    } else {
      toast.error(`로그인 상태가 아닙니다.${'\n'} 로그인 해주세요.`)
    }
  }, [docId, userId])

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

  const onTestimonySubmitHandler = async (form: TestimonyFormType) => {
    if (userId && docId) {
      const docRef = doc(db, 'users', userId, 'declarations', docId)
      await updateDoc(docRef, {
        hasTesimony: true,
        testimony: {
          content: form.content,
          createdAt: serverTimestamp(),
        },
      })
      toast.success('예언적 선포문이 작성되었습니다')
      testimonyReset({ content: '' })
      queryClient.invalidateQueries(['findDeclaration', [userId, docId]])
      setOpenInput(false)
    } else {
      toast.error(`로그인 상태가 아닙니다.${'\n'} 로그인 후 진행해주세요.`)
    }
  }

  const onTestimonyEditSubmitHandler = async (form: TestimonyFormType) => {
    if (user) {
      try {
        if (userId && docId && data) {
          const docRef = doc(db, 'users', userId, 'declarations', docId)

          if (form.content !== data.testimony.content) {
            await updateDoc(docRef, {
              testimony: {
                content: form.content,
                createdAt: serverTimestamp(),
              },
            })
            toast.success('나의 간증문이 수정되었습니다')
            queryClient.invalidateQueries(['findDeclaration', [userId, docId]])
          }
        }
        setTestimonyEditMode(false)
      } catch (error) {
        console.log(error)
        toast.error('간증문 수정 중 오류가 발생했습니다.')
      }
    } else {
      toast.error(`로그인 상태가 아닙니다.${'\n'} 로그인 해주세요.`)
    }
  }

  const onTestimonyDeleteHandler = async () => {
    if (user) {
      try {
        if (userId && docId) {
          const docRef = doc(db, 'users', userId, 'declarations', docId)
          await updateDoc(docRef, {
            hasTesimony: false,
            testimony: deleteField(),
          })
        }
        toast.success('해당 간증문을 삭제하였습니다')
        queryClient.invalidateQueries(['findDeclaration', [userId, docId]])
        setOpenTestimonyAlert(false)
      } catch (error) {
        console.log(error)
        toast.error('간증문 삭제 중 오류가 발생했습니다.')
        setOpenTestimonyAlert(false)
      }
    } else {
      toast.error(`로그인 상태가 아닙니다.${'\n'} 로그인 해주세요.`)
      setOpenTestimonyAlert(false)
    }
  }

  useEffect(() => {
    if (data) {
      editSetValue('comments', data.declaration)
      editSetValue('tag', data.tag)
      setCount(data.declaration.length)
      if (data.testimony) {
        testimonySetValue('content', data.testimony.content)
      }
    }
  }, [data])

  useEffect(() => {
    if (!user) {
      toast.error('로그인 후 이용해주세요')
      setTimeout(() => {
        router.push('/')
      }, 4000)
    }
  }, [])

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
            className="text-black flex cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            선포문 목록으로 가기
          </button>
        </div>

        {dataLoading ? (
          <Spinner />
        ) : data ? (
          <>
            {!editMode ? (
              <div className="py-6 px-4 border rounded-md shadow-sm">
                <CardHeader
                  title={'2023 My Declaration'}
                  user={user!}
                  onEditClick={() => setEditMode(!editMode)}
                  onDeleteClick={() => setOpenAlert(true)}
                />
                <Declaration data={data} />
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
              <Testimony
                testimony={data.testimony}
                user={user!}
                editMode={testimonyEditMode}
                onEditClick={() => setTestimonyEditMode(!testimonyEditMode)}
                onDeleteClick={() => setOpenTestimonyAlert(true)}
                handleSubmit={testimonyHandleSubmit}
                submitHandler={onTestimonyEditSubmitHandler}
                register={testimonyRegister}
                reset={testimonyReset}
                getValues={testimonyGetValues}
                errors={testimonyErrors}
              />
            ) : (
              <div className="mt-4">
                {!openInput ? (
                  <Button
                    onClick={() => setOpenInput(true)}
                    title="간증문 작성하기"
                    prime
                  />
                ) : (
                  <TestimonyForm
                    handleSubmit={testimonyHandleSubmit}
                    submitHandler={onTestimonySubmitHandler}
                    register={testimonyRegister}
                    setOpen={setOpenInput}
                    reset={testimonyReset}
                    getValues={testimonyGetValues}
                    errors={testimonyErrors}
                  />
                )}
              </div>
            )}
          </>
        ) : (
          <Spinner />
        )}
      </div>
      {openAlert && (
        <Alert
          open={openAlert}
          setOpen={setOpenAlert}
          onActionHandler={onDeleteHandler}
        />
      )}
      {openTestimonyAlert && (
        <Alert
          isTestimony
          open={openTestimonyAlert}
          setOpen={setOpenTestimonyAlert}
          onActionHandler={onTestimonyDeleteHandler}
        />
      )}
    </Layout>
  )
}

export default Detail

Detail.getInitialProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query
  return {
    docId: id,
  }
}
