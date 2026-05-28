import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Appbar from '../components/appbar'
import Image from 'next/image'
import HomePageLinks from '../components/homePageLinks'

export default function Page() {
  return (
    <>
      <Appbar title='UCSC Grad Ticket Connector' />
      <Box sx={{p: '20px', display: 'flex', gap: '20px'}}>
        <Box sx={{width: '50%'}}>
          <Box sx={{border: '3px solid #e1ba0c', borderRadius: '10px', p: '10px', bgcolor: '#0b0931'}}>
            <Typography variant='h2' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
              Welcome to the UCSC Grad Ticket Connector!
            </Typography>
          </Box>
          <Box sx={{border: '3px solid #e1ba0c', borderRadius: '10px', p: '10px', mt: '20px', bgcolor: '#0b0931'}}>
            <Typography variant='h5' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
              This student built site has one simple goal: match people with extra UCSC graduation tickets with people who need extra UCSC graduation tickets.
            </Typography>
            <br/>
            <Typography variant='h5' sx={{color: '#e1ba0c'}}>
              Every year it is a struggle for students to find enough tickets for all their family and friends to come watch them at graduation.
              This site connects people who need tickets with people who have them.
            </Typography>
          </Box>
          {/* <Box sx={{border: '3px solid #e1ba0c', borderRadius: '10px', p: '10px', mt: '20px', bgcolor: '#0b0931'}}>
            <Typography variant='h5' sx={{color: '#e1ba0c'}}>
              Click here to list your extra tickets!
            </Typography>
          </Box>
          <Box sx={{border: '3px solid #e1ba0c', borderRadius: '10px', p: '10px', mt: '20px', bgcolor: '#0b0931'}}>
            <Typography variant='h5' sx={{color: '#e1ba0c'}}>
              Click here to browse, filter, and save tickets!
            </Typography>
          </Box> */}
          <HomePageLinks />
          <Box sx={{p: '10px'}}>
            <Typography variant='body1' sx={{color: '#0b0931'}}>
              Not affiliated with UCSC. Be wary of fake listings.
            </Typography>
          </Box>
        </Box>
        <Box sx={{width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Image src='/Two_Banana_Slugs.jpg' alt='Banana Slugs' width={600} height={400}
            style={{borderRadius: '10px', width: '100%', height: 'auto', border: '3px solid #e1ba0c'}} />
        </Box>
      </Box>
    </>
  )
}
