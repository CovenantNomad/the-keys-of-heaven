import { sendSignInLinkToEmail } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { actionCodeSettings } from 'src/config/auth_email_link_actioncode_settings'
import { auth } from 'src/config/firebaseConfig'

interface EmailLoginProps {}

export interface EmailForm {
  email: string
}

const EmailLogin = ({}: EmailLoginProps) => {
  const { handleSubmit, register } = useForm<EmailForm>()

  const submitHandler = ({ email }: EmailForm) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        toast.success(`${email}로 접속메일이 전송되었습니다`)
        localStorage.setItem('emailForSignIn', email)
      })
      .catch((error) => {
        console.log(error.code)
        toast.error(error.message)
      })
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
