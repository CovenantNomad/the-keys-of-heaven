import { collection, DocumentData, getDocs } from 'firebase/firestore'
import { db } from 'src/config/firebaseConfig'

export const findDeclarations = async (userId: string) => {
  const docRef = collection(db, 'users', userId, 'declarations')
  const querySnapshot = await getDocs(docRef)

  let temp: DocumentData[] = []
  querySnapshot.forEach((doc: DocumentData) => {
    temp.push({
      ...doc.data(),
      documentId: doc.id,
    })
  })

  return temp
}
