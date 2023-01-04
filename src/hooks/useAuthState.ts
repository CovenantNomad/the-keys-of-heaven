import { onAuthStateChanged } from 'firebase/auth'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { auth } from 'src/config/firebaseConfig'
import { UserType } from 'src/types/types'

function useAuthState(): [
  UserType | null,
  Dispatch<SetStateAction<UserType | null>>,
  boolean
] {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<UserType | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          username: user.displayName || '',
          uid: user.uid,
          photoURL: user.photoURL || '',
          email: user.email || '',
        })
        setIsLoading(false)
      } else {
        setUserInfo(null)
        setIsLoading(false)
      }
    })
  }, [])

  return [userInfo, setUserInfo, isLoading]
}

export default useAuthState
