import {Router, Request, Response} from 'express'
import {MemberService} from './service'

const router = Router()
const memberService = new MemberService()

router.get('/member/:id/name', async (req: Request, res: Response) => {
  const name = await memberService.getName(req.params.id)
  if (name === null) {
    res.status(404).json({message: 'Member not found'})
    return
  }
  res.json({name})
})

export default router
