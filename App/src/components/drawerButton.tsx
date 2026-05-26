'use client'

import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import DrawerList from './drawerList'

export default function DrawerButton() {
  const [open, setOpen] = useState(false)
  return (
    <Box sx={{px: '10px'}}>
      <IconButton onClick={() => setOpen(!open)} sx={{color: '#e1ba0c'}}
        aria-label={open ? 'close menu' : 'open menu'}>
        <MenuIcon fontSize='large'/>
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}
        slotProps={{paper: {sx: {bgcolor: '#0b0931', width: 250, zIndex: 1999}},
        backdrop: {sx: {zIndex: 1998}}}}>
        <DrawerList />
      </Drawer>
    </Box>
  )
}
