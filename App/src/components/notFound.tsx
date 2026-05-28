'use-client'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/navigation';


export default function NotFound() {
  const router = useRouter();
  return(
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '50vh'}}>
      <Box>
        <Typography variant="h4" sx={{fontWeight: 'bold', color: '#0b0931'}}>
          Hmm, we can't seem find that {':('}
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'center',
          alignItems: 'center', bgcolor: '#0b0931', borderRadius: '10px',
          p: '10px', border: '3px solid #e1ba0c', mt: '30px', cursor: 'pointer'}}
          onClick={() => router.push('/tickets')}>
          <Typography variant="h6" sx={{fontWeight: 'bold', color: '#e1ba0c'}}>
            Back to tickets
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}