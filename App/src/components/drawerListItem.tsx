'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MailIcon from '@mui/icons-material/Mail';
import {useRouter} from 'next/navigation';

export default function DrawerListItem({title}: {title: string}) {
  const router = useRouter()
  const iconsx = {color: '#e1ba0c', pr: '10px'}
  let icon = <></>
  let link = ''
  if (title == 'Home') {
    icon = <HomeFilledIcon sx={iconsx}/>
    link = '/'
  } else if (title == 'Browse Tickets') {
    icon = <ConfirmationNumberIcon sx={iconsx}/>
    link = '/tickets'
  } else if (title == 'My Tickets') {
    icon = <LocalActivityIcon sx={iconsx}/>
    link = '/my-tickets'
  } else if (title == 'Saved Tickets') {
    icon = <BookmarkIcon sx={iconsx}/>
    link = '/saved'
  } else if (title == 'Messages') {
    icon = <MailIcon sx={iconsx}/>
    link = '/messages'
  }
  return (
    <Box sx={{display: 'flex', alignItems: 'center',
      borderBottom: '1px solid #68676c', p: '10px', cursor: 'pointer'}}
      onClick={() => {router.push(link)}}>
      {icon}
      <Typography variant='h6' sx={{color: '#e1ba0c'}}>
        {title}
      </Typography>
    </Box>
  )
}