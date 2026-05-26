import { Router, Request, Response } from 'express'
import { AuthService } from './service'

const router = Router()
const authService = new AuthService()

router.get('/check', async (req: Request, res: Response) => {
  try {
    const user = await authService.check(req.headers.authorization)
    res.json(user)
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
  }
})

router.post('/auth/google/exchange', async (req: Request, res: Response) => {
  try {
    const { code, redirectUri } = req.body as { code: string; redirectUri: string }
    if (!code || !redirectUri) {
      res.status(400).json({ message: 'code and redirectUri are required' })
      return
    }
    const result = await authService.exchangeGoogle(code, redirectUri)
    res.json(result)
  } catch (err) {
    console.error('[auth/router] exchangeGoogle threw:', err)
    res.status(401).json({ message: 'Unauthorized' })
  }
})

export default router
