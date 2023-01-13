import Empty from '@components/Empty'
import Layout from '@components/Layout'
import ListItem from '@components/ListItem'
import Sidebar from '@components/Sidebar'
import Spinner from '@components/Spinner'
import Stats from '@components/Stats'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useQuery } from 'react-query'
import useAuthState from 'src/hooks/useAuthState'
import { findDeclarations } from 'src/lib/declarations'

interface DeclarationsProps {}

const Declarations = ({}: DeclarationsProps) => {
  const router = useRouter()
  const [user, _, isLoading] = useAuthState()
  const userId = user?.uid

  const { isLoading: dataLoading, data } = useQuery(
    ['findDeclarations', userId],
    () => findDeclarations(userId!),
    {
      enabled: !!userId,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  )

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('로그인 후 이용해주세요')
      setTimeout(() => {
        router.push('/')
      }, 4000)
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>천국열쇠 챌린지</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative h-[calc(100%-5rem)] top-20 py-8 px-4 overflow-y-scroll">
        {dataLoading ? (
          <Spinner />
        ) : (
          data && (
            <div>
              <div className="grid grid-cols-2 gap-x-3 mb-8">
                <Stats name="결제완료 선포문" stat={data.length || 0} />
                <Stats
                  name="실현완료 선포문"
                  stat={data.filter((item) => item.hasTesimony).length || 0}
                />
              </div>
              {data.length !== 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {data.map((item, index) => (
                    <ListItem key={index} item={item} />
                  ))}
                </div>
              ) : (
                <Empty />
              )}
            </div>
          )
        )}
      </div>
    </Layout>
  )
}

export default Declarations
