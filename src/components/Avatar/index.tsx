import Image from 'next/image'
import React from 'react'

interface AvatarProps {}

const Avatar = ({}: AvatarProps) => {
  return (
    <Image
      className="inline-block rounded-full"
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      alt=""
      width={40}
      height={40}
    />
  )
}

export default Avatar
