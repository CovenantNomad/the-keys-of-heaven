import React from 'react'

interface SignInProps {}

const SignIn = ({}: SignInProps) => {
  return (
    <div className="flex items-center justify-between">
      <button className="py-4 px-8 border rounded-md">Google</button>
      <button className="py-4 px-8 border rounded-md">Naver</button>
      <button className="py-4 px-8 border rounded-md">Kakao</button>
    </div>
  )
}

export default SignIn
