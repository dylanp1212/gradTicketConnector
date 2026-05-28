'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Appbar from '../../components/appbar'
import MyTicketList from '../../components/myTicketList'
import {useRouter} from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';


export default function Page() {
  const router = useRouter();
  return (
    <>
      <Appbar title='My Tickets' />
      <Box sx={{p: '20px'}}>
        <Box sx={{border: '3px solid #e1ba0c', bgcolor: '#0b0931',
          borderRadius: '10px', display: 'flex', justifyContent: 'center',
          p: '10px', mx: '10px', mb: '20px', cursor: 'pointer',
          alignItems: 'center'}}
          onClick={() => {router.push('/new')}}>
          <Typography variant="h4" sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
            Make a new listing
          </Typography>
          <AddIcon fontSize="large" sx={{color: '#e1ba0c'}} />
        </Box>
        <MyTicketList />
      </Box>
    </>
  )
}
