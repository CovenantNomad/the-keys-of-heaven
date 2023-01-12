import { FieldValue } from 'firebase/firestore'

interface UserType {
  username: string
  email: string
  photoURL: string
  uid: string
}

interface DeclarationType {
  createdAt: FieldValue
  declaration: string
  tag: string
  initialX: number
  initialY: number
  published: boolean
  testimony: {
    content: string
    createdAt: FieldValue
  }
  userId: string
}

interface SelectedDeclarationType {
  tag: string
  declaration: string
}

interface TestimonyFormType {
  content: string
  createdAt: FieldValue
}

interface DeclarationFormType {
  tag: string
  comments: string
}
