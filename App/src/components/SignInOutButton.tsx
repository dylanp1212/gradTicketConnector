'use client'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'
import { signOut, getSessionUser } from '../auth/actions'
import { SessionUser } from '../auth'
import { useEffect, useState } from 'react'

export default function SignInOutButton() {
  const router = useRouter()
  const [user, setUser] = useState<SessionUser | undefined>(undefined)

  useEffect(() => {
    void getSessionUser().then(setUser)
  }, [])

  const handleClick = () => {
    if (user) {
      void (async () => {
        await signOut()
        setUser(undefined)
        router.push('/login')
      })()
    } else {
      router.push('/login')
    }
  }

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        mr: 1,
        bgcolor: '#e1ba0c',
        color: '#0b0931',
        fontWeight: 700,
        textTransform: 'none',
        borderRadius: '4px',
        '&:hover': { bgcolor: '#c9a50a' },
      }}
    >
      {user ? `Sign Out` : 'Sign In'}
    </Button>
  )
}
