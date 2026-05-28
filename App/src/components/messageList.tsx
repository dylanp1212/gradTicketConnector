import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MessageListItem from './messageListItem'
import {useContext} from 'react'
import {Messagecontext} from '../app/messages/messagecontext'
import {useState, useEffect, useRef} from 'react'
import {getConvo} from '../message/actions'
import {Message} from '../message'
import {getSessionUser} from '../auth/actions';
import {SessionUser} from '../auth'
// import NewMessageBar from './newMessageBar'


export default function MessageList() {
  const ctx = useContext(Messagecontext);
  const empty: Message[] = []
  const [messages, setMessages] = useState(empty)
  const [user, setUser] = useState<SessionUser | undefined>(undefined)
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    getSessionUser().then(setUser)
  }, [])
  useEffect (() => {
    const getMessages = async (): Promise<void> => {
      if (!ctx?.currconvo) return;
      const user = await getSessionUser();
      if (!user) return;
      const c = await getConvo(user.id, ctx.currconvo);
      setMessages(c);
    }
    void getMessages();
  }, [ctx?.currconvo, ctx?.refresh])
  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [messages])
  if (!ctx) {
    return (null);
  }
  
  return (
    <Box sx={{p: '20px'}}>
      {/* <Box sx={{border: '3px solid #e1ba0c', borderRadius: '10px',
        bgcolor: '#0b0931', p: '20px', m: '10px', display: 'flex',
        justifyContent: 'center'}}>
        <Typography variant="h4" sx={{color: '#e1ba0c'}}>
          Messages with *Place Holder*
        </Typography>
      </Box> */}
      {ctx.currconvo ?
        (<Box sx={{px: '10px'}}>
          {messages.map((m, i) => (
            <MessageListItem key={i} user={user?.id} message={m} />
          ))}
          <div ref={bottomRef} />
        </Box>) :
        (<Box sx={{display: 'flex', justifyContent: 'center',
          alignItems: 'center'}}>
          <Typography variant="h6" sx={{color: '#0b0931', fontWeight: 'bold'}}>
            No conversation selected
          </Typography>
        </Box>)
      }
    </Box>
  )
}