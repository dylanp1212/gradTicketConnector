'use-client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useContext, useEffect, useState} from 'react'
import {Messagecontext} from '../app/messages/messagecontext'
import {getMemberName} from '../member/actions'

export default function ConvoListItem({id}: {id: string}) {
  const [name, setName] = useState('')
  useEffect(() => {
    const getname = async (): Promise<void> => {
      const n = await getMemberName(id);
      setName(n);
    }
    void getname();
  }, [id])
  const ctx = useContext(Messagecontext);
  if (!ctx) {
    return (null);
  }
  const {currconvo, setCurrconvo} = ctx;
  return (
    <Box sx={{borderBottom: '3px solid #0b0931', display: 'flex',
      alignItems: 'center', bgcolor: (currconvo == id ? '#0b0931' : '#adadb0'),
      p: '20px', cursor: 'pointer'}}
      onClick={() => setCurrconvo(id)}>
      <Typography noWrap variant="h6" sx={{color: (currconvo == id ? '#e1ba0c' : '#0b0931'), fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis'}}>
        {name}
      </Typography>
    </Box>
  )
}