export interface UserAuth {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}
