import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const isBrowser = typeof window !== 'undefined'
  const [vh, setVh] = useState(isBrowser ? window.innerHeight : 0)
  const screenSize = useCallback(
    debounce(() => {
      setVh(window.innerHeight * 0.01)
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, 100),
    [vh]
  )

  useEffect(() => {
    screenSize()
    window.addEventListener('resize', screenSize)

    return () => window.removeEventListener('resize', screenSize)
  }, [screenSize])

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  )
}
