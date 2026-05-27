'use client'

import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Appbar from '../../components/appbar'
import TicketList from '../../components/ticketList'
import FilterBar from '../../components/filterBar'
import {useState} from 'react'
import {Options} from '../listing'


export default function Page() {
  // change to read from url params
  const defaultoptions = {term: 'Spring 2026', available: true}
  const [options, setOptions] = useState<Options>(defaultoptions)
  return (
    <>
      <Appbar title='Browse Tickets' />
      <Box sx={{p: '20px', display: 'flex', justifyContent: 'space-between', height: 'calc(100vh - 64px)', overflow: 'hidden', boxSizing: 'border-box'}}>
        <Box sx={{width: '30%', display: 'flex', flexDirection: 'column', minHeight: '100%'}}>
          <FilterBar setFunc={setOptions} />
        </Box>
        <Box sx={{width: '70%', overflowY: 'auto', height: '100%'}}>
          <TicketList options={options} />
        </Box>
      </Box>
    </>
  )
}
