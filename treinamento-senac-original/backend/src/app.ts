import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import userRoutes from './routes/UserRoutes.js'
import authRoutes from './routes/AuthRoutes.js'
import todoRoutes from './routes/TodoRoutes.js'
import cors from 'cors'
import { HttpError } from './errors/HttpError.js'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // se usar cookie/auth
  }),
)

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/todos', todoRoutes)

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    })
  }

  console.error(err)

  return res.status(500).json({
    status: 500,
    message: 'Internal server error',
  })
})

export default app
