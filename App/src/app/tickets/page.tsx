import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Appbar from '../../components/appbar'
import TicketList from '../../components/ticketList'

export default function Home() {
  return (
    <>
      <Appbar title='Browse Tickets' />
      <Box sx={{p: '20px'}}>
        <TicketList />
      </Box>
    </>
  )
}
