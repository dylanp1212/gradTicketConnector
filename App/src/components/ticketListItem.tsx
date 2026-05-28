import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {useRouter} from 'next/navigation';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IconButton from '@mui/material/IconButton';
import {useState, useEffect} from 'react'
import {checkSaved, saveListing, removeSavedListing} from '../saved/actions'
import {SessionUser} from '../auth'

import {Listing, Ceremony} from '../listing'

export const fancyCeremony = (ceremony: Ceremony): string => {
  const ceremonies: Record<Ceremony, string> = {'stevenson': 'Stevenson College',
    'cowell': 'Cowell College', 'crown': 'Crown College', 'merrill': 'Merrill College',
    'porter': 'Porter College', 'kresge': 'Kresge College', 'oakes': 'Oakes College',
    'rcc': 'Rachel Carson College', 'c9': 'College 9', 'jrl': 'John R Lewis College',
    'baskin': 'Baskin Engineering'}
  return (ceremonies[ceremony])
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {month: 'short', day: '2-digit'})
}

export const verified = <Box sx={{display: 'flex', alignItems: 'center'}}>
  <VerifiedUserIcon sx={{color: '#e1ba0c', pl: '10px'}} />
  <Typography variant='caption' sx={{color: '#e1ba0c', pl: '5px'}}>
    Listed by UCSC email
  </Typography>
</Box>

export default function TicketListItem({listing, user}: {listing: Listing, user: SessionUser | undefined}) {
  const router = useRouter();
  const [saved, setSaved] = useState<boolean>(false)
  useEffect(() => {
    const checkIfSaved = async (): Promise<void> => {
      if (!user) return
      const s = await checkSaved(user.id, listing.id)
      setSaved(s)
    }
    void checkIfSaved()
  }, [listing.id, user])
  const saveClick = async (e) => {
    e.stopPropagation()
    if (!user) {
      router.push('/login')
      return;
    }
    if (saved) {
      await removeSavedListing(user.id, listing.id)
      setSaved(false)
    } else {
      await saveListing(user.id, listing.id)
      setSaved(true)
    }
  }
  return (
    <Box sx={{border: '3px solid #0b0931', p: '20px', mx: '10px', mt: '10px',
      mb: '20px', borderRadius: '10px', bgcolor: '#adadb0', cursor: 'pointer'}}
      onClick={() => {router.push(`/view-ticket?id=${listing.id}`)}}>
      <Box sx={{bgcolor: '#0b0931', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderRadius: '10px', p: '10px'}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Typography variant='h4' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
            {fancyCeremony(listing.ceremony)}
          </Typography>
          {listing.verified ? verified : ''}
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Typography variant='h6' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
            Ticket Quantity: {listing.quantity}
          </Typography>
          <IconButton aria-label={saved ? 'unsave listing' : 'save listing'}
            onClick={saveClick}>
            {saved ? <BookmarkIcon sx={{color: '#e1ba0c'}} /> : <BookmarkBorderIcon sx={{color: '#e1ba0c'}} />}
          </IconButton>
        </Box>
      </Box>
      <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', mt: '10px',
        display: 'flex', justifyContent: 'space-between'}}>
        <Box>
          <Typography variant='h6' sx={{color: '#0b0931', fontWeight: 'bold'}}>
            {listing.title}
          </Typography>
          <Typography variant='body1' sx={{color: '#0b0931', whiteSpace: 'pre-wrap'}}>
            {listing.description}
          </Typography>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <Typography variant='body1' sx={{color: '#0b0931', fontWeight: 'bold'}}>
            {formatDate(new Date(listing.listed))}
          </Typography>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant='body1' sx={{color: '#0b0931',
              fontWeight: listing.method.includes('sell') ? 'bold' : ''}}>
              Buy
            </Typography>
            {listing.method.includes('sell') ?
              <CheckIcon sx={{color: '#0b0931'}}/> : <CloseIcon sx={{color: '#0b0931'}}/>}
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant='body1' sx={{color: '#0b0931',
              fontWeight: listing.method.includes('give') ? 'bold' : ''}}>
              Free
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
    </Box>
  )
}