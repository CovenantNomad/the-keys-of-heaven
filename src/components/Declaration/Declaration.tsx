import { DocumentData } from 'firebase/firestore'
import React from 'react'
import { formatDate } from 'src/utils'

interface DeclarationProps {
  data: DocumentData
}

const Declaration = ({ data }: DeclarationProps) => {
  return (
    <div className="mt-6">
      <div className="pt-3 pb-6 border-b">
        <p className="text-gray-500 mb-2">예언적 선포문</p>
        <p>{data.declaration}</p>
      </div>
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-x-8">
          <p className="text-gray-500">태그</p>
          <p>#{data.tag}</p>
        </div>
        <p className="text-gray-500">{formatDate(data.createdAt.seconds)}</p>
      </div>
    </div>
  )
}

export default Declaration
