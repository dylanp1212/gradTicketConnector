import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useContext} from 'react'
import {Messagecontext} from '../app/messages/messagecontext'

export default function ConvoListItem({id}: {id: string}) {
  const ctx = useContext(Messagecontext);
  if (!ctx) {
    return (null);
  }
  const {currconvo, setCurrconvo} = ctx;
  return (
    <Box sx={{borderBottom: '3px solid #0b0931', display: 'flex',
      alignItems: 'center', bgcolor: (currconvo == id ? '#0b0931' : '#adadb0'), p: '20px'}}
      onClick={() => setCurrconvo(id)}>
      <Typography noWrap variant="h6" sx={{color: (currconvo == id ? '#e1ba0c' : '#0b0931'), fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis'}}>
        {id}
      </Typography>
    </Box>
  )
}