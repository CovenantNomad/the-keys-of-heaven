import { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { GetServerSidePropsContext } from 'next'
import { useQuery } from 'react-query'
// hooks
import useAuthState from 'src/hooks/useAuthState'
// fetch
import { db } from 'src/config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { findDeclarations } from 'src/lib/declarations'
// components
import Layout from '@components/Layout'
import Header from '@components/Header'
import AddModal from '@components/Modal/AddModal'
import FloatingActionButton from '@components/FloatingActionButton'
import DraggablePoint from '@components/DraggablePoint'
import Spinner from '@components/Spinner'
import ReadModal from '@components/Modal/ReadModal'
import { SelectedDeclarationType } from 'src/types/types'
import { getTotalCount } from 'src/lib/totalCount'

interface HomeProps {}

export default function Home({}: HomeProps) {
  const [addModalOepn, setAddModalOepn] = useState(false)
  const [readModalOepn, setReadModalOepn] = useState(false)
  const [selectedDeclaration, setSelectedDeclaration] =
    useState<SelectedDeclarationType | null>(null)
  const [user, _, isLoading] = useAuthState()
  const userId = user?.uid
  const boardRef = useRef<HTMLDivElement>(null)
  const boardX = useRef(0)
  const boardY = useRef(0)
  const boardWidth = useRef(0)
  const boardHeight = useRef(0)

  useEffect(() => {
    if (boardRef.current !== null) {
      const { width, height, x, y } = boardRef.current.getBoundingClientRect()
      boardX.current = x
      boardY.current = y
      boardWidth.current = width
      boardHeight.current = height
    }
  }, [])

  const { isLoading: dataLoading, data } = useQuery(
    ['findDeclarations', userId],
    () => findDeclarations(userId!),
    {
      enabled: !!userId,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  )

  const { isLoading: countLoading, data: totalCount } = useQuery(
    'getTotalCount',
    getTotalCount,
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  )

  const onClickHandler = useCallback(
    ({ tag, declaration }: SelectedDeclarationType) => {
      setReadModalOepn(true)
      setSelectedDeclaration({
        tag,
        declaration,
      })
    },
    [setSelectedDeclaration]
  )

  return (
    <Layout>
      <Head>
        <title>천국열쇠 챌린지</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src={'/images/tree.png'}
        alt="tree images for background"
        width={1501}
        height={1500}
        style={{
          position: 'absolute',
          top: '60%',
          left: 0,
          transform: 'translateY(-60%)',
        }}
        priority={true}
      />

      <div className="relative w-full h-[calc(100%-5rem)] top-20 px-4 overflow-hidden">
        <Header count={totalCount?.published || 0} />

        <div className="relative w-full h-[calc(100%-10rem)]" ref={boardRef}>
          {isLoading ? (
            <Spinner />
          ) : !user ? (
            <p className="text-center text-sm text-gray-500 leading-[1.5] mt-4">
              로그인하시면 나의 천국열쇠를 작성할 수 있습니다
              <br />
              (메뉴바 하단 → 로그인)
            </p>
          ) : dataLoading ? (
            <Spinner />
          ) : data && boardRef !== null ? (
            data.map((item, index) => (
              <DraggablePoint
                key={index}
                boardRef={boardRef}
                boardX={boardX}
                boardY={boardY}
                boardWidth={boardWidth}
                boardHeight={boardHeight}
                index={index + 1}
                item={item}
                onClickHandler={() =>
                  onClickHandler({
                    tag: item.tag,
                    declaration: item.declaration,
                  })
                }
              />
            ))
          ) : (
            <div className="absolute bottom-0 right-0">
              <h1 className="bg-red-500 text-white px-6 py-2 ">
                나의 예언적 선포문을 작성해 보세요 👇
              </h1>
            </div>
          )}
        </div>
        <FloatingActionButton setOepn={setAddModalOepn} />
      </div>
      {addModalOepn && <AddModal setOepn={setAddModalOepn} />}
      {readModalOepn && (
        <ReadModal
          setOepn={setReadModalOepn}
          selectedDeclaration={selectedDeclaration}
        />
      )}
    </Layout>
  )
}
