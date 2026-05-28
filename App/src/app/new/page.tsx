'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useRouter} from 'next/navigation';
import Appbar from '../../components/appbar'
import {useState, useEffect} from 'react'
import {Ceremony} from '../../listing'
import {fancyCeremony} from '../../components/ticketListItem'
import {getSessionUser} from '../../auth/actions'
import {createNewListing} from '../../listing/actions'
import AddIcon from '@mui/icons-material/Add';


export default function Page() {
  const [user, setUser] = useState<SessionUser | undefined>(undefined)
  const [ceremony, setCeremony] = useState<Ceremony|undefined>(undefined)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [term, setTerm] = useState('Spring 2026');
  const [method, setMethod] = useState<string[]>([]);
  const canPost = title.trim().length > 0 && title.length <= 50 && description.trim().length > 0 && description.length <= 300 && ceremony !== undefined && method.length > 0;
  const router = useRouter();
  useEffect(() => {
    getSessionUser().then(setUser)
  }, [])
  const postListing = async () => {
    if (!canPost || !user) {
      return;
    }
    const ver = user.email.endsWith('@ucsc.edu')
    const newListing = {
      ceremony: ceremony,
      term: term,
      member: user.id,
      quantity: quantity,
      title: title,
      description: description,
      method: method,
      verified: ver,
    }
    const x = await createNewListing(newListing)
    // console.log(x)
    router.push('/tickets')
  }
  return (
    <>
      <Appbar title='New Post' />
        <Box sx={{p: '20px', display: 'flex'}}>
          <Box sx={{width: '50%', pr: '10px'}}>
            <Box sx={{bgcolor: '#adadb0', borderRadius: '10px', p: '20px', border: '3px solid #0b0931'}}>
              <Typography variant='h4' sx={{color: '#0b0931', fontWeight: 'bold'}}>
                Title
              </Typography>
              <TextField fullWidth value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                error={title.length > 50}
                helperText={`${title.length}/50`}
                slotProps={{htmlInput: {'style': {fontSize: '30px', color: '#0b0931'},
                  'aria-label': 'title'}}}
              />
            </Box>
            <Box sx={{bgcolor: '#adadb0', borderRadius: '10px', p: '20px', border: '3px solid #0b0931', mt: '20px'}}>
              <Typography variant='h4' sx={{color: '#0b0931', fontWeight: 'bold'}}>
                Description
              </Typography>
              <TextField fullWidth multiline rows={7} value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  error={description.length > 300}
                  helperText={`${description.length}/300`}
                slotProps={{htmlInput: {'style': {fontSize: '15', color: '#0b0931'},
                  'aria-label': 'description'}}}
              />
            </Box>
          </Box>
          <Box sx={{width: '50%', pl: '10px'}}>
            <Box sx={{bgcolor: '#adadb0', display: 'flex',
              alignItems: 'center', borderRadius: '10px', p: '20px', border: '3px solid #0b0931'}}>
              <Typography variant='h5' sx={{color: '#0b0931', fontWeight: 'bold'}}>
                Ceremony:
              </Typography>
              <Box sx={{bgcolor: '#0b0931',
                borderRadius: '10px', p: '10px', mx: '10px', width: '100%',
                display: 'flex', justifyContent: 'center', minHeight: '48px',
                alignItems: 'center'}}>
                <Typography variant='h4' sx={{color: '#e1ba0c', fontWeight: 'bold'}}>
                  {ceremony ? fancyCeremony(ceremony) : ''}
                </Typography>
              </Box>
            </Box>
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '8px', mt: '10px'}}>
              {(['cowell', 'stevenson', 'crown', 'merrill', 'porter', 'kresge', 'oakes', 'rcc', 'c9', 'jrl', 'baskin'] as Ceremony[]).map((c) => {
                const selected = ceremony === c
                return (
                  <Box key={c} onClick={() => setCeremony(c)}
                    sx={{px: '10px', py: '4px', borderRadius: '6px', cursor: 'pointer', border: '2px solid #0b0931',
                      bgcolor: selected ? '#0b0931' : 'transparent'}}>
                    <Typography sx={{color: selected ? '#e1ba0c' : '#0b0931', fontWeight: 600, fontSize: '0.85rem'}}>
                      {fancyCeremony(c)}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
            <Box sx={{display: 'flex', gap: '20px', mt: '20px'}}>
              <Box sx={{flex: 1}}>
                <Box sx={{bgcolor: '#adadb0', borderRadius: '10px', p: '20px', border: '3px solid #0b0931',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Typography variant='h4' sx={{color: '#0b0931', fontWeight: 'bold'}}>
                    Quantity
                  </Typography>
                  <TextField type='number' value={quantity}
                    onChange={(e) => setQuantity(Math.min(5, Math.max(1, Number(e.target.value))))}
                    variant='outlined'
                    slotProps={{htmlInput: {min: 1, max: 5, style: {fontSize: '15px', color: '#0b0931', fontWeight: 'bold'}}}}
                    sx={{width: '80px'}}
                  />
                </Box>
                <Box sx={{bgcolor: '#adadb0', borderRadius: '10px', p: '20px', border: '3px solid #0b0931', mt: '20px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Typography variant='h4' sx={{color: '#0b0931', fontWeight: 'bold'}}>
                    Term
                  </Typography>
                  <Select value={term} onChange={(e) => setTerm(e.target.value)}
                    sx={{color: '#0b0931', fontWeight: 600,
                      '& .MuiOutlinedInput-notchedOutline': {borderColor: '#0b0931'},
                      '& .MuiSvgIcon-root': {color: '#0b0931'}}}>
                    <MenuItem value='Spring 2026'>Spring 2026</MenuItem>
                    <MenuItem value='Spring 2025'>Spring 2025</MenuItem>
                    <MenuItem value='Spring 2024'>Spring 2024</MenuItem>
                  </Select>
                </Box>
              </Box>
              <Box sx={{bgcolor: '#adadb0', borderRadius: '10px', p: '20px', border: '3px solid #0b0931', flex: 1}}>
                <Typography variant='h4' sx={{color: '#0b0931', fontWeight: 'bold'}}>
                  Method
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '8px', mt: '8px'}}>
                  {(['sell', 'give', 'trade'] as const).map((m) => {
                    const selected = method.includes(m)
                    return (
                      <Box key={m} onClick={() => setMethod(prev => selected ? prev.filter(x => x !== m) : [...prev, m])}
                        sx={{px: '10px', py: '4px', borderRadius: '6px', cursor: 'pointer', border: '2px solid #0b0931',
                          bgcolor: selected ? '#0b0931' : 'transparent'}}>
                        <Typography sx={{color: selected ? '#e1ba0c' : '#0b0931', fontWeight: 600, fontSize: '0.85rem'}}>
                          {m === 'sell' ? 'Sell' : m === 'give' ? 'Give Away' : 'Trade'}
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Box>
            <Box sx={{borderRadius: '10px', p: '10px', mt: '20px', display: 'flex',
              justifyContent: 'center', cursor: canPost ? 'pointer' : 'default',
              bgcolor: canPost ? '#0b0931' : 'transparent',
              border: '3px solid #0b0931', alignItems: 'center'}}
              onClick={postListing}>
              <Typography variant='h5' sx={{color: canPost ? '#e1ba0c' : '#0b0931', fontWeight: 'bold'}}>
                Post Listing
              </Typography>
              <AddIcon fontSize="large" sx={{color: canPost ? '#e1ba0c' : '#0b0931'}} />
            </Box>
          </Box>
        </Box>
    </>
  )
}
