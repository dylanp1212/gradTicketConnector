import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Appbar from '../../components/appbar'
import SavedTicketList from '../../components/savedTicketList'

export default function Page() {
  return (
    <>
      <Appbar title='Saved' />
      <Box sx={{p: '20px'}}>
        <SavedTicketList />
      </Box>
    </>
  )
}
