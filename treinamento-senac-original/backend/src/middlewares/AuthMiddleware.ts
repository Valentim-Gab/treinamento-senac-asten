import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { authConfig } from '../config/AuthConfig.js'

export function requireAuth(
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const payload = jwt.verify(token, authConfig.jwtSecret) as JwtPayload

    if (!payload.sub) {
      return res.status(401).json({ message: 'Invalid token payload' })
    }

    const userId = Number(payload.sub)

    if (Number.isNaN(userId)) {
      return res.status(401).json({ message: 'Invalid token subject' })
    }

    req.userId = userId

    return next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
