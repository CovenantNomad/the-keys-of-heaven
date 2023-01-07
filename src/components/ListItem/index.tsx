import React, { useState } from 'react'
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
          console.log('진입')
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
              <button className="w-10 h-10 p-2" onClick={() => setOpen(true)}>
                <Delete />
              </button>
            </div>
          </div>
          {open && (
            <Alert
              open={open}
              setOpen={setOpen}
              onActionHandler={() => onDeleteHandler(item.documentId)}
            />
          )}
        </>
      ) : (
        <div>데이터 없음</div>
      )}
    </div>
  )
}

export default ListItem
