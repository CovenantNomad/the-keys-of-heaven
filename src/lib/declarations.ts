import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from 'firebase/firestore'
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

export const findDeclaration = async (userId: string, docId: string) => {
  const docRef = doc(db, 'users', userId, 'declarations', docId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log('No such document!')
  }
}
