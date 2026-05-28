import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Appbar from '../components/appbar';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Appbar title='Page Not Found' />
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: 'calc(100vh - 64px)', gap: '20px'}}>
        <Typography variant='h1' sx={{color: '#0b0931', fontWeight: 'bold'}}>
          404
        </Typography>
        <Typography variant='h5' sx={{color: '#0b0931'}}>
          Uh oh. Couldn't find this page {':('}
        </Typography>
        <Link href='/tickets' style={{textDecoration: 'none'}}>
          <Box sx={{bgcolor: '#0b0931', borderRadius: '10px', px: '24px',
            py: '12px', cursor: 'pointer', border: '3px solid #e1ba0c'}}>
            <Typography variant='h6' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
              Back to tickets
            </Typography>
          </Box>
        </Link>
      </Box>
    </>
  )
}
