'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DrawerButton from './drawerButton';
// import SignInOutButton from './SignInOutButton';


export default function Appbar({title}: {title: string}) {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="fixed" color="transparent" sx={{bgcolor: '#0b0931',
        boxShadow: 'none', borderBottom: '1px solid #e1ba0c', zIndex: 2000}}>
        <Toolbar disableGutters>
          <DrawerButton />
          <Typography variant="h5" component="div" sx={{flexGrow: 1,
            fontFamily: '"Lexend", sans-serif', fontWeight: 600,
            letterSpacing: '-0.01em', color: '#e1ba0c'}}>
            {title}
          </Typography>
          {/* <SignInOutButton /> */}
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </Box>
  );
}
