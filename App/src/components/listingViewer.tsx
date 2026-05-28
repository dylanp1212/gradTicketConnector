'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import {Listing} from '../listing'
import {SessionUser} from '../auth'
import {getSessionUser} from '../auth/actions'
import {getMemberName} from '../member/actions'
import {editQuantity, editMethod, editAvailable} from '../listing/actions'
import {fancyCeremony, formatDate} from './ticketListItem'

export default function ListingViewer({listing: initialListing}: {listing: Listing}) {
  const [listing, setListing] = useState(initialListing)
  const [user, setUser] = useState<SessionUser | undefined>(undefined)
  const [quantity, setQuantity] = useState(listing.quantity)
  const [method, setMethod] = useState<string[]>(listing.method)
  const [name, setName] = useState('')
  useEffect(() => {
    getSessionUser().then(setUser)
  }, [])
  useEffect(() => {
    const getName = async (): Promise<void> => {
      const n = await getMemberName(listing.member);
      setName(n);
    }
    void getName();
  }, [listing])
  const verified = <Box sx={{display: 'flex', alignItems: 'center'}}>
    <VerifiedUserIcon sx={{color: '#0b0931', pl: '10px'}} />
    <Typography variant='caption' sx={{color: '#0b0931', pl: '5px'}}>
      Verified UCSC email holder
    </Typography>
  </Box>
  return (
    <Box>
      <Box sx={{bgcolor: '#0b0931', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderRadius: '10px', p: '20px', border: '2px solid #e1ba0c'}}>
        <Typography variant='h4' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
          {fancyCeremony(listing.ceremony)}
        </Typography>
        <Typography variant='h6' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
          Ticket Quantity: {listing.quantity}
        </Typography>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', mt: '10px'}}>
        <Typography sx={{p: '10px', color: '#0b0931'}}>
          Listed on
        </Typography>
        <Typography variant='body1' sx={{color: '#0b0931', fontWeight: 'bold'}}>
          {formatDate(new Date(listing.listed))}, {new Date(listing.listed).getFullYear()}
        </Typography>
        <Typography sx={{p: '10px', color: '#0b0931'}}>
          by
        </Typography>
        <Typography sx={{color: '#0b0931', fontWeight: 'bold'}}>
          {name}
        </Typography>
        {listing.verified ? verified : ''}
      </Box>
      <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', mt: '10px',
        display: 'flex', justifyContent: 'space-between', bgcolor: '#adadb0'}}>
          <Typography variant='h4' sx={{color: '#0b0931', fontWeight: 'bold'}}>
            {listing.title}
          </Typography>
      </Box>
      <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', mt: '10px',
        display: 'flex', justifyContent: 'space-between', bgcolor: '#adadb0'}}>
          <Typography variant='h6' sx={{color: '#0b0931', whiteSpace: 'pre-wrap'}}>
            {listing.description}
          </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant='body1' sx={{color: '#0b0931',
              fontWeight: listing.method.includes('sell') ? 'bold' : ''}}>
              {user?.id === listing.member ? 'Sell' : 'Buy'}
            </Typography>
            {listing.method.includes('sell') ?
              <CheckIcon sx={{color: '#0b0931'}}/> : <CloseIcon sx={{color: '#0b0931'}}/>}
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant='body1' sx={{color: '#0b0931',
              fontWeight: listing.method.includes('give') ? 'bold' : ''}}>
              {user?.id === listing.member ? 'Give Away' : 'Free'}
            </Typography>
            {listing.method.includes('give') ?
              <CheckIcon sx={{color: '#0b0931'}}/> : <CloseIcon sx={{color: '#0b0931'}}/>}
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant='body1' sx={{color: '#0b0931',
              fontWeight: listing.method.includes('trade') ? 'bold' : ''}}>
              Trade
            </Typography>
            {listing.method.includes('trade') ?
              <CheckIcon sx={{color: '#0b0931'}}/> : <CloseIcon sx={{color: '#0b0931'}}/>}
          </Box>
        </Box>
      </Box>
      <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', mt: '10px',
        display: 'flex', justifyContent: 'center', bgcolor: '#adadb0'}}>
        {user?.id === listing.member
          ? <Box sx={{display: 'flex', gap: '10px', width: '100%'}}>
              <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', display: 'flex',
                justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                <Typography variant='body1' sx={{color: '#0b0931', fontWeight: 'bold'}}>
                  Change Quantity
                </Typography>
                <TextField type='number' value={quantity}
                  onChange={(e) => setQuantity(Math.min(5, Math.max(1, Number(e.target.value))))}
                  variant='outlined' size='small'
                  slotProps={{htmlInput: {min: 1, max: 5, style: {fontSize: '15px', color: '#0b0931', fontWeight: 'bold'}}}}
                  sx={{width: '80px'}}
                />
                <Box onClick={() => editQuantity(listing.id, quantity).then(l => { if (l) setListing(l) })}
                  sx={{bgcolor: '#0b0931', borderRadius: '6px', px: '14px', py: '6px', cursor: 'pointer'}}>
                  <Typography variant='body1' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
                    Go
                  </Typography>
                </Box>
              </Box>
              <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', display: 'flex',
                alignItems: 'center', gap: '10px'}}>
                <Typography variant='body1' sx={{color: '#0b0931', fontWeight: 'bold'}}>
                  Change Method
                </Typography>
                <Box sx={{display: 'flex', gap: '8px'}}>
                  {(['sell', 'give', 'trade'] as const).map((m) => {
                    const selected = method.includes(m)
                    return (
                      <Box key={m} onClick={() => setMethod(prev => selected ? prev.filter(x => x !== m) : [...prev, m])}
                        sx={{px: '10px', py: '4px', borderRadius: '6px', cursor: 'pointer', border: '2px solid #0b0931',
                          bgcolor: selected ? '#0b0931' : 'transparent'}}>
                        <Typography sx={{color: selected ? '#adadb0' : '#0b0931', fontWeight: 600, fontSize: '0.85rem'}}>
                          {m === 'sell' ? 'Sell' : m === 'give' ? 'Give Away' : 'Trade'}
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>
                <Box onClick={() => editMethod(listing.id, method).then(l => { if (l) setListing(l) })}
                  sx={{bgcolor: '#0b0931', borderRadius: '6px', px: '14px', py: '6px', cursor: 'pointer'}}>
                  <Typography variant='body1' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
                    Go
                  </Typography>
                </Box>
              </Box>
              <Box onClick={() => editAvailable(listing.id, !listing.available).then(l => { if (l) setListing(l) })}
                sx={{bgcolor: '#0b0931', border: '3px solid #0b0931', borderRadius: '10px', p: '10px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 1}}>
                <Typography variant='body1' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
                  {listing.available == true ? 'Close Listing' : 'Reopen Listing'}
                </Typography>
              </Box>
            </Box>
          : <Box sx={{bgcolor: '#0b0931', borderRadius: '10px', p: '10px', display: 'flex',
              justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
              <Box sx={{display: 'flex'}}>
                <Typography variant='body1' sx={{color: '#e1ba0c'}}>
                  Message
                </Typography>
                <Typography variant='body1' sx={{color: '#e1ba0c', fontWeight: 'bold', px: '10px'}}>
                  {listing.name}
                </Typography>
                <Typography variant='body1' sx={{color: '#e1ba0c'}}>
                  about {listing.quantity > 1 ? 'these tickets' : 'this ticket'}
                </Typography>
              </Box>
            </Box>
        }
      </Box>
    </Box>
  )
}