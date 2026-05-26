'use client'

import Box from '@mui/material/Box';
import {useRouter} from 'next/navigation';
import Toolbar from '@mui/material/Toolbar';
import DrawerListItem from './drawerListItem';


export default function DrawerList() {
  const router = useRouter();
  const pages = ['Home', 'Browse Tickets', 'My Tickets', 'Saved Tickets']
  return (
    <Box sx={{width: 250}}>
      <Toolbar />
      {pages.map((p, i) => (
        <DrawerListItem key={i} title={p} />
      ))}
    </Box>
  );
}
