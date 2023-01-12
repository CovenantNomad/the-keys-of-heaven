import { DebouncedFunc } from 'lodash'
import React, { Dispatch, SetStateAction } from 'react'
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { DeclarationFormType, UserType } from 'src/types/types'
import EditHeader from './EditHeader'
import FormHeader from './FormHeader'

interface DeclarationFormProps {
  handleSubmit: UseFormHandleSubmit<DeclarationFormType>
  submitHandler: (data: DeclarationFormType) => Promise<void>
  register: UseFormRegister<DeclarationFormType>
  title: string
  user: UserType | null
  setOpen?: Dispatch<SetStateAction<boolean>>
  errors: FieldErrorsImpl
  count: number
  onCountWord: DebouncedFunc<() => void>
  editMode?: boolean
  getValues: UseFormGetValues<DeclarationFormType>
}

const DeclarationForm = ({
  handleSubmit,
  submitHandler,
  register,
  title,
  user,
  setOpen,
  errors,
  count,
  onCountWord,
  editMode,
  getValues,
}: DeclarationFormProps) => {
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="w-full">
      {setOpen ? (
        <FormHeader title={title} user={user} setOepn={setOpen} />
      ) : (
        <EditHeader title={title} user={user} />
      )}

      <div className="mt-5">
        <div className="relative">
          <label htmlFor="tag" className="sr-only">
            태그
          </label>
          <input
            id="tag"
            placeholder={`${
              editMode
                ? getValues().tag
                : '태그를 입력해 주세요. (#없이, 최대 10자)'
            }`}
            maxLength={10}
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
            placeholder={`${
              editMode
                ? getValues().comments
                : '예언적 선포문을 입력해 주세요. (최대 200자)'
            }`}
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
  )
}

export default DeclarationForm
