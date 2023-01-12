import React from 'react'

interface HeaderProps {
  count: number
}

const Header = ({ count }: HeaderProps) => {
  return (
    <div className="h-14 flex items-center justify-center">
      <h2 className="text-xl">
        현재 <strong className="text-teal-600 mx-1">{count}개</strong>{' '}
        천국열쇠가 선포되었습니다
      </h2>
    </div>
  )
}

export default Header
