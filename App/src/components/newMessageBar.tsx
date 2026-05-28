import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import {useState, useEffect, useContext} from 'react'
import {getSessionUser} from '../auth/actions';
import {createMessage} from '../message/actions'
import {Messagecontext} from '../app/messages/messagecontext'


export default function NewMessageBar() {
  const ctx = useContext(Messagecontext)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<SessionUser | undefined>(undefined)
  useEffect(() => {
    getSessionUser().then(setUser)
  }, [])
  const sendclick = async () => {
    if (!user) return;
    if (!ctx?.currconvo) return;
    const newMessage ={
      memberto: ctx.currconvo,
      memberfrom: user.id,
      content: message,
    }
    // console.log(newMessage)
    await createMessage(newMessage)
    setMessage('')
    ctx.setRefresh(r => r + 1)
  }
  return (
    <>
    {ctx.currconvo ?
      (<Box sx={{py: '10px', px: '20px', bgcolor: '#adadb0',
        borderRadius: '10px', border: '2px solid #0b0931',
        display: 'flex', alignItems: 'center'}}>
        <TextField fullWidth value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          slotProps={{htmlInput: {'style': {fontSize: '15px', color: '#0b0931'},
            'aria-label': 'new message'}}}
        />
        <Box sx={{pl: '20px'}}>
          <IconButton aria-label='send message' onClick={sendclick}>
            <SendIcon fontSize="large" sx={{color: '#0b0931'}} />
          </IconButton>
        </Box>
      </Box>) : ''
    }
    </>
  )
}