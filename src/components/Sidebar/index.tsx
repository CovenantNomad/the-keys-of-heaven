import React from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, googleAuthProvider } from 'src/config/firebaseConfig'
import useAuthState from 'src/hooks/useAuthState'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { sidebarState } from 'src/state/sidebarState'
import { useRouter } from 'next/router'

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const [_, setOpen] = useRecoilState(sidebarState)
  const [user] = useAuthState()
  const router = useRouter()

  const signInGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const user = result.user
        if (user) {
          const docRef = doc(db, 'users', user.uid)
          const docSnap = await getDoc(docRef)

          if (!docSnap.exists()) {
            await setDoc(docRef, {
              username: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
            })
          }
        }
        toast.success('로그인 하였습니다')
        setOpen(false)
      })
      .catch((error) => {
        console.log(error.code)
        toast.error(error.message)
      })
  }

  const signout = () => {
    setOpen(false)
    signOut(auth)
      .then(() => {
        toast.success('로그아웃 되었습니다')
      })
      .catch((error) => {
        toast.error(error.message)
      })
    router.push('/')
  }

  return (
    <motion.aside
      initial={{
        x: 500,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { duration: 0.4 },
      }}
      exit={{
        x: 500,
        opacity: 0,
        transition: { duration: 0.4 },
      }}
      className="absolute top-20 w-full h-full z-50 flex flex-col items-end px-8 py-8 bg-[#1e3c72] "
    >
      <ul className="text-end flex flex-col gap-y-6">
        <li className="text-white">
          <Link href={'/'}>
            <button onClick={() => setOpen(false)}>첫화면</button>
          </Link>
        </li>
        <li className="text-white">
          <Link href={'/declarations'}>
            <button onClick={() => setOpen(false)}>예언적 선포문 보기</button>
          </Link>
        </li>
        <li className="text-white">
          <Link href={'/declarations'}>
            <button onClick={() => setOpen(false)}>사용설명서</button>
          </Link>
        </li>
      </ul>
      <div className="mt-16">
        {user ? (
          <button onClick={signout} className="text-white">
            로그아웃
          </button>
        ) : (
          <button onClick={signInGoogle} className="text-white">
            구글 로그인
          </button>
        )}
      </div>
    </motion.aside>
  )
}

export default Sidebar
