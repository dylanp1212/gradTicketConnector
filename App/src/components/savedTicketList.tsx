'use client'

import {Listing, Options} from '../listing';
import {getAllSavedListings} from '../saved/actions';
import {getSessionUser} from '../auth/actions';
import {SessionUser} from '../auth';
import {useState, useEffect} from 'react';
import TicketListItem from './ticketListItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';


export default function SavedTicketList() {
  const [saved, setSaved] = useState<Listing[]>([]);
  const [user, setUser] = useState<SessionUser | undefined>(undefined)
  useEffect(() => {
    const getSavedListings = async (): Promise<void> => {
      const u = await getSessionUser();
      if (!u) return;
      setUser(u)
      const l = await getAllSavedListings(u.id);
      setSaved(l);
    }
    void getSavedListings();
  }, [])
  return (
    <>
      {saved.map((l, i) => (
        <TicketListItem key={i} listing={l} user={user} />
      ))}
      {saved.length == 0 ? 
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h6" sx={{p: '20px', color: '#0b0931', fontWeight: 'bold'}}>
            Nothing saved yet!
          </Typography> 
        </Box> : ''}
    </>
  )
}