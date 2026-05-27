import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Message} from '../message'

export default function MessageListItem({message, user}: {message: Message, user: string}) {
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