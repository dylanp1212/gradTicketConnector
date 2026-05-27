import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function NoMatches() {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <Typography variant='h6' sx={{color: '#0b0931', fontWeight: 'bold'}}>
        Hmm, can't find anything that matches those filters
      </Typography>
    </Box>
  )
}