import CardHeader from '@components/CardHeader'
import EditHeader from '@components/InputForm/EditHeader'
import FormHeader from '@components/InputForm/FormHeader'
import { DocumentData } from 'firebase/firestore'
import React from 'react'
import {
  FieldErrorsImpl,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form'
import { TestimonyFormType, UserType } from 'src/types/types'
import { formatDate } from 'src/utils'

interface TestimonyProps {
  testimony: DocumentData
  user: UserType
  editMode: boolean
  onEditClick: () => void
  onDeleteClick: () => void
  handleSubmit: UseFormHandleSubmit<TestimonyFormType>
  submitHandler: (data: TestimonyFormType) => Promise<void>
  register: UseFormRegister<TestimonyFormType>
  getValues: UseFormGetValues<TestimonyFormType>
  reset: UseFormReset<TestimonyFormType>
  errors: FieldErrorsImpl
}

const Testimony = ({
  testimony,
  user,
  editMode,
  onEditClick,
  onDeleteClick,
  handleSubmit,
  submitHandler,
  register,
  getValues,
  reset,
  errors,
}: TestimonyProps) => {
  return (
    <div className="mt-12">
      {!editMode ? (
        <>
          <CardHeader
            title={'나의 간증'}
            user={user}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
          <div className="border px-4 py-4 mt-2 rounded-lg shadow-md">
            <p className="pt-2 pb-4">{testimony.content}</p>
            <p className="border-t py-2 text-base text-gray-500">
              {formatDate(testimony.createdAt.seconds)}
            </p>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(submitHandler)}>
            <EditHeader title={'나의 간증'} user={user} />
            <div className="border px-4 py-4 mt-2 rounded-lg shadow-md">
              <div>
                <label htmlFor="content" className="sr-only">
                  간증문
                </label>
                <textarea
                  id="content"
                  rows={10}
                  placeholder={`${
                    editMode ? getValues().content : '간증문을 작성해주세요'
                  }`}
                  {...register('content', {
                    required: true,
                  })}
                  className="w-full border pt-3 px-2 focus:outline-none focus:ring-primary focus:border-primary"
                />
                {errors.tag && (
                  <p className="absolute top-10 left-0 text-red-600 bg-white w-full">
                    간증문을 입력해 주세요
                  </p>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default Testimony
