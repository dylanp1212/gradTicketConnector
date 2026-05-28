import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Message} from '../message'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation';


export default function MessageListItem({message, user}: {message: Message, user: string|undefined}) {
  const router = useRouter();
  if (!user) {
    return;
  }
  if (message.listing && message.listingtitle) {
    return (
      <Box sx={{py: '5px', display: 'flex', justifyContent: (message.memberto == user ? 'flex-start' : 'flex-end')}}>
        <Box sx={{p: '10px', borderRadius: '10px', width: '40%',
          bgcolor: '#e1ba0c', cursor: 'pointer',
          display: 'flex', justifyContent: (message.memberto == user ? 'flex-start' : 'flex-end')}}
          onClick={() => router.push(`/view-ticket?id=${message.listing}`)}>
          <Typography variant="h6" sx={{color: '#0b0931'}}>
            Click here to view: {message.listingtitle}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{py: '5px', display: 'flex', justifyContent: (message.memberto == user ? 'flex-start' : 'flex-end')}}>
      <Box sx={{p: '10px', borderRadius: '10px', width: '40%',
        bgcolor: (message.memberto == user ? '#adadb0' : '#0b0931'),
        display: 'flex', justifyContent: (message.memberto == user ? 'flex-start' : 'flex-end')}}>
        <Typography variant="h6" sx={{color: (message.memberto == user ? '#0b0931' : '#adadb0')}}>
          {message.content}
        </Typography>
      </Box>
    </Box>
  )
}