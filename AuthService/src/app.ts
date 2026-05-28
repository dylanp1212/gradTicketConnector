import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import authRouter from './auth/router'
import memberRouter from './member/router'

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v0', authRouter)
app.use('/api/v0', memberRouter)

app.get('/api/v0/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: 'Internal server error' })
})

export default app
