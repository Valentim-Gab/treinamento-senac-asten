export interface Login {
  email: string
  password: string
}

export interface Register {
  name: string
  email: string
  password: string
}

export interface UserAuth {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
}
