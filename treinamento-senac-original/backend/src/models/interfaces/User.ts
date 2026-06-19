interface UserBase {
  name: string
}

export interface User extends UserBase {
  id: number
  email?: string
  created_at?: string
  updated_at?: string
}

export interface UserCreate extends UserBase {
  email: string
  password: string
}
