import Dot from '@components/Dot'
import { DocumentData } from 'firebase/firestore'
import React from 'react'

interface ListItemProps {
  item: DocumentData | undefined
}

const ListItem = ({ item }: ListItemProps) => {
  return (
    <div className="border shadow-md rounded-md px-6 py-3">
      {item !== undefined ? (
        <>
          <div className="pt-3 pb-6">
            <p className="text-gray-500 mb-2">예언적 선포문</p>
            <p>{item.declaration}</p>
          </div>
          <div className="flex items-center justify-between gap-x-8 pt-2 border-t ">
            <p className="text-gray-500 text-sm">#{item.tag}</p>
            <button className="w-10 h-10 p-2">
              <Dot />
            </button>
          </div>
        </>
      ) : (
        <div>데이터 없음</div>
      )}
    </div>
  )
}

export default ListItem
