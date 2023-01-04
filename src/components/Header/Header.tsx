import Spinner from '@components/Spinner/Spinner'
import React from 'react'
import { UserType } from 'src/types/types'

interface HeaderProps {
  isLoading: boolean
  user: UserType | null
  count: number
}

const Header = ({ isLoading, user, count }: HeaderProps) => {
  return (
    <div>
      <h2 className="text-center text-xl">
        현재 <strong className="text-teal-600">{count}개</strong> 천국열쇠가
        선포되었습니다
      </h2>
      {isLoading ? (
        <Spinner />
      ) : (
        !user && (
          <p className="text-center text-sm text-gray-500 leading-[1.5] mt-4">
            로그인하시면 나의 천국열쇠를 작성할 수 있습니다
            <br />
            (메뉴바 하단 → 로그인)
          </p>
        )
      )}
    </div>
  )
}

export default Header
