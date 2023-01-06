import React, { useState } from 'react'
import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import Edit from '@components/Icons/Edit'
import Delete from '@components/Icons/Delete'

interface ListItemProps {
  item: DocumentData | undefined
}

const ListItem = ({ item }: ListItemProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border shadow-md rounded-md px-6 py-3">
      {item !== undefined ? (
        <>
          <div className="pt-3 pb-6">
            <p className="text-gray-500 mb-2">예언적 선포문</p>
            <p>{item.declaration}</p>
          </div>
          <div className="relative flex items-center justify-between gap-x-8 pt-2 border-t">
            <p className="text-gray-500 text-sm">#{item.tag}</p>
            <div className="flex gap-x-2">
              <Link href={`/declarations/${item.documentId}`}>
                <button className="w-10 h-10 p-2">
                  <Edit />
                </button>
              </Link>
              <button className="w-10 h-10 p-2">
                <Delete />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>데이터 없음</div>
      )}
    </div>
  )
}

export default ListItem
