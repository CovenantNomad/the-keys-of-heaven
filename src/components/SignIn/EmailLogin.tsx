import React from 'react'
import { useForm } from 'react-hook-form'

interface EmailLoginProps {}

export interface EmailForm {
  email: string
}

const EmailLogin = ({}: EmailLoginProps) => {
  const { handleSubmit, register } = useForm<EmailForm>()

  const submitHandler = (data: EmailForm) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="">
        <label htmlFor="email" className="">
          이메일 주소
        </label>
        <input
          id="email"
          placeholder={'이메일을 입력해주세요'}
          {...register('email')}
          className="form-input w-full rounded-md py-3 focus:outline-none focus:ring-primary focus:border-primary mt-1"
        />
      </div>
    </form>
  )
}

export default EmailLogin
