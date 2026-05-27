import express from 'express'
import userRoutes from './routes/UserRoutes.js'
import authRoutes from './routes/AuthRoutes.js'

const app = express()

app.use(express.json())
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

export default app
