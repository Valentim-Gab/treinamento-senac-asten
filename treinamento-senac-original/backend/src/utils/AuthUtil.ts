import type { Request } from 'express'

export function getUserId(req: Request): number {
  const user = (req as any).user

  if (!user?.sub) {
    throw new Error('User not authenticated')
  }

  return user.sub
}
