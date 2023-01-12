import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import {
  arrayRemove,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  runTransaction,
} from 'firebase/firestore'
import Edit from '@components/Icons/Edit'
import Delete from '@components/Icons/Delete'
import useAuthState from 'src/hooks/useAuthState'
import { db } from 'src/config/firebaseConfig'
import { toast } from 'react-hot-toast'
import Alert from '@components/Alert'
import { useQueryClient } from 'react-query'
import Empty from '@components/Empty'
import { formatDate } from 'src/utils'

interface ListItemProps {
  item: DocumentData | undefined
}

const ListItem = ({ item }: ListItemProps) => {
  const [open, setOpen] = useState(false)
  const [user] = useAuthState()
  const queryClient = useQueryClient()

  const onDeleteHandler = async (documentId: string) => {
    if (user) {
      try {
        await runTransaction(db, async (transition) => {
          const docRef = doc(db, 'users', user.uid, 'declarations', documentId)
          const countRef = doc(db, 'all-declarations', 'totalInfo')
          const countDoc = await transition.get(countRef)

          await deleteDoc(docRef)

          if (countDoc.exists()) {
            const newCount = countDoc.data().published - 1
            transition.update(countRef, { published: newCount })
            transition.update(countRef, {
              _ref: arrayRemove(documentId),
            })
          }
        })
        setOpen(false)
        toast.success('예언적 선포문을 삭제하였습니다')
        queryClient.invalidateQueries(['findDeclarations', user.uid])
      } catch (error) {
        console.log(error)
        setOpen(false)
        toast.error('예언적 선포문 삭제에 실패하였습니다')
      }
    } else {
      setOpen(false)
      toast.error(
        `로그인 상태가 아닙니다.${'\n'} 로그인 후 삭제하실 수 있습니다.`
      )
    }
  }

  return (
    <div className="border shadow-md rounded-md px-6 py-6">
      {item !== undefined ? (
        <>
          <p className="pb-3">{item.declaration}</p>
          <div className="flex justify-between items-center border-t pt-3">
            <p className="text-gray-500">
              {formatDate(item.createdAt.seconds)}
            </p>
            <Link href={`/declarations/${item.documentId}`}>
              <button className="px-4 py-1 text-teal-500 cursor-pointer">
                수정
              </button>
            </Link>
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default ListItem
