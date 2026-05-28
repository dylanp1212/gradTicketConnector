'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/navigation';

export default function HomePageLinks() {
  const router = useRouter();
  return (
    <>
      <Box sx={{border: '3px solid #e1ba0c', borderRadius: '10px', p: '10px',
        mt: '20px', bgcolor: '#0b0931', cursor: 'pointer'}}
        onClick={() => router.push('/my-tickets')}>
        <Typography variant='h5' sx={{color: '#e1ba0c'}}>
          Click here to list your extra tickets!
        </Typography>
      </Box>
      <Box sx={{border: '3px solid #e1ba0c', borderRadius: '10px', p: '10px',
        mt: '20px', bgcolor: '#0b0931', cursor: 'pointer'}}
        onClick={() => router.push('/tickets')}>
        <Typography variant='h5' sx={{color: '#e1ba0c'}}>
          Click here to browse, filter, and save tickets!
        </Typography>
      </Box>
    </>
  )
}