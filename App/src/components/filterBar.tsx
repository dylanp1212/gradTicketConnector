'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {useState} from 'react'
import {Ceremony, Options} from '../listing'

import {fancyCeremony} from './ticketListItem'

export default function FilterBar({setFunc}: {setFunc: React.Dispatch<React.SetStateAction<Options>>}) {
  const empty: Ceremony[] = []
  const [ceremonies, setCeremonies] = useState(empty)
  const emptyMethod: string[] = []
  const [method, setMethod] = useState(emptyMethod)
  const [term, setTerm] = useState('Spring 2026')
  const [available, setAvailable] = useState<true | undefined>(true)
  const [verified, setVerified] = useState<true | undefined>(undefined)
  const goclick = () => {
    const options: Options = {term: term}
    if (ceremonies.length > 0) {
      options.ceremonies = ceremonies
    }
    if (method.length > 0) {
      options.method = method
    }
    if (available) {
      options.available = true
    }
    if (verified) {
      options.verified = true
    }
    setFunc(options)
  }

  return (
    <Box sx={{border: '3px solid #0b0931', p: '20px', ml: '10px', mt: '10px', mr: '20px',
      borderRadius: '10px', bgcolor: '#adadb0', flexGrow: 1}}>
      <Box sx={{bgcolor: '#0b0931', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderRadius: '10px', p: '10px'}}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography variant='h4' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
            Filtering
          </Typography>
          <TuneIcon fontSize='large' sx={{color: '#e1ba0c', pl: '10px'}}/>
        </Box>
        <Box sx={{py: '5px', px: '10px', borderRadius: '4px', bgcolor: '#e1ba0c', cursor: 'pointer'}}
          onClick={goclick}>
          <Typography variant='h6' sx={{color: '#0b0931', fontWeight: 'bold'}}>
            Go
          </Typography>
        </Box>
      </Box>
      <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', mt: '10px'}}>
        <Typography variant='h6' sx={{color: '#0b0931', fontWeight: 'bold'}}>
          Ceremony
        </Typography>
        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '8px', mt: '8px'}}>
          {(['cowell', 'stevenson', 'crown', 'merrill', 'porter', 'kresge', 'oakes', 'rcc', 'c9', 'jrl', 'baskin'] as Ceremony[]).map((c) => {
            const selected = ceremonies.includes(c)
            return (
              <Box key={c} onClick={() => setCeremonies(prev => selected ? prev.filter(x => x !== c) : [...prev, c])}
                sx={{px: '10px', py: '4px', borderRadius: '6px', cursor: 'pointer', border: '2px solid #0b0931',
                  bgcolor: selected ? '#0b0931' : 'transparent'}}>
                <Typography sx={{color: selected ? '#adadb0' : '#0b0931', fontWeight: 600, fontSize: '0.85rem'}}>
                  {fancyCeremony(c)}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>
      <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', mt: '10px'}}>
        <Typography variant='h6' sx={{color: '#0b0931', fontWeight: 'bold'}}>
          Method
        </Typography>
        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '8px', mt: '8px'}}>
          {(['sell', 'give', 'trade']).map((m) => {
            const selected = method.includes(m)
            return (
              <Box key={m} onClick={() => setMethod(prev => selected ? prev.filter(x => x !== m) : [...prev, m])}
                sx={{px: '10px', py: '4px', borderRadius: '6px', cursor: 'pointer', border: '2px solid #0b0931',
                  bgcolor: selected ? '#0b0931' : 'transparent'}}>
                <Typography sx={{color: selected ? '#adadb0' : '#0b0931', fontWeight: 600, fontSize: '0.85rem'}}>
                  {m == 'sell' ? 'Buy' : (m == 'give' ? 'Free' : 'Trade')}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>
      <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', mt: '10px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='h6' sx={{color: '#0b0931', fontWeight: 'bold'}}>
          Term
        </Typography>
        <Select size='small' value={term} onChange={(e) => setTerm(e.target.value)}
          sx={{color: '#0b0931', fontWeight: 600, fontSize: '0.85rem',
            '& .MuiOutlinedInput-notchedOutline': {borderColor: '#0b0931'},
            '& .MuiSvgIcon-root': {color: '#0b0931'}}}>
          <MenuItem value='Spring 2026'>Spring 2026</MenuItem>
          <MenuItem value='Spring 2025'>Spring 2025</MenuItem>
          <MenuItem value='Spring 2024'>Spring 2024</MenuItem>
        </Select>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', mt: '10px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: '8px'}}>
          <Typography variant='h6' sx={{color: '#0b0931', fontWeight: 'bold'}}>
            Available
          </Typography>
          <Checkbox checked={available === true} onChange={(e) => setAvailable(e.target.checked ? true : undefined)}
            sx={{'&.Mui-checked': {color: '#0b0931'}, color: '#0b0931'}} />
        </Box>
        <Box sx={{border: '3px solid #0b0931', borderRadius: '10px', p: '10px', mt: '10px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <VerifiedUserIcon sx={{color: '#0b0931', pr: '5px'}} />
            <Typography variant='caption' sx={{color: '#0b0931', fontWeight: 'bold'}}>
              Listed by UCSC email
            </Typography>
          </Box>
          <Checkbox checked={verified === true} onChange={(e) => setVerified(e.target.checked ? true : undefined)}
            sx={{'&.Mui-checked': {color: '#0b0931'}, color: '#0b0931'}} />
        </Box>
      </Box>
    </Box>
  )
}