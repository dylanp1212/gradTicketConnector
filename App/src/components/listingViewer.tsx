import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {Listing} from '../listing'
import {fancyCeremony, formatDate} from './ticketListItem'

export default function ListingViewer({listing}: {listing: Listing}) {
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
          {listing.name}
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
      <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', mt: '10px',
        display: 'flex', justifyContent: 'center', bgcolor: '#adadb0'}}>
        <Box sx={{bgcolor: '#0b0931', borderRadius: '10px', p: '10px', display: 'flex',
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
      </Box>
    </Box>
  )
}