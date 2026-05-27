'use client'

import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Appbar from '../../components/appbar'
import ConvoList from '../../components/convoList'
import MessageList from '../../components/messageList'
// import {useState} from 'react'
import {Messageprovider} from './messagecontext'
import NewMessageBar from '../../components/newMessageBar'

export default function Page() {
  // const [currconvo, setCurrconvo] = useState<string|null>(null)
  return (
    <Messageprovider>
      <Appbar title='Messages' />
      <Box sx={{display: 'flex', justifyContent: 'space-between', height: 'calc(100vh - 64px)', overflow: 'hidden', boxSizing: 'border-box'}}>
        <Box sx={{width: '30%', overflowY: 'auto', height: '100%', borderRight: '3px solid #0b0931'}}>
          <ConvoList />
        </Box>
        <Box sx={{width: '70%', height: '100%', display: 'flex', flexDirection: 'column'}}>
          <Box sx={{flex: 1, overflowY: 'auto'}}>
            <MessageList />
          </Box>
          <Box sx={{px: '30px', mb: '20px', flexShrink: 0}}>
            <NewMessageBar />
          </Box>
        </Box>
      </Box>
    </Messageprovider>
  )
}
