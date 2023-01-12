import { doc, getDoc } from 'firebase/firestore'
import { db } from 'src/config/firebaseConfig'

export const countRef = doc(db, 'all-declarations', 'totalInfo')

export const getTotalCount = async () => {
  const docSnap = await getDoc(countRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log('No such document!')
  }
}
