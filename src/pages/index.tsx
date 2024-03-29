import Head from 'next/head'
import { Inter } from '@next/font/google'
import Layout from '@components/Layout'
import SignIn from '@components/SignIn'
import EmailLogin from '@components/SignIn/EmailLogin'
import DividerWithLabel from '@components/Divider/DividerWithLabel'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout auth>
      <Head>
        <title>천국열쇠 챌린지</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-berkshire">The Keys of Heaven</h1>
        <div className="w-full max-w-sm mt-20">
          <SignIn />
          <DividerWithLabel label="Or" />
          <EmailLogin />
        </div>
      </div>
    </Layout>
  )
}
