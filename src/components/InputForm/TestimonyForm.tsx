import Button from '@components/Button'
import React, { Dispatch, SetStateAction } from 'react'
import {
  FieldErrorsImpl,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form'
import { TestimonyFormType } from 'src/types/types'

interface TestimonyFormProps {
  handleSubmit: UseFormHandleSubmit<TestimonyFormType>
  submitHandler: (data: TestimonyFormType) => Promise<void>
  register: UseFormRegister<TestimonyFormType>
  getValues: UseFormGetValues<TestimonyFormType>
  reset: UseFormReset<TestimonyFormType>
  errors: FieldErrorsImpl
  setOpen: Dispatch<SetStateAction<boolean>>
}

const TestimonyForm = ({
  handleSubmit,
  submitHandler,
  register,
  setOpen,
  errors,
  getValues,
  reset,
}: TestimonyFormProps) => {
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="w-full">
      <div>
        <label htmlFor="content" className="sr-only">
          간증문
        </label>
        <textarea
          id="content"
          rows={10}
          placeholder={'간증문을 작성해주세요.'}
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
      <div className="flex justify-end gap-x-4 mt-2">
        <Button
          type="reset"
          color="red"
          title="취소"
          round
          onClick={() => {
            setOpen(false)
            reset({ content: '' })
          }}
        />
        <Button type="submit" color="teal" title="작성완료" round />
      </div>
    </form>
  )
}

export default TestimonyForm
