'use client'

import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Appbar from '../../components/appbar'
import {useSearchParams} from 'next/navigation';
import {useState, useEffect} from 'react';
import {Listing} from '../../listing'
import {getListingById} from '../../listing/actions'
import ListingViewer from '../../components/listingViewer'

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? undefined;
  const [listing, setListing] = useState<Listing|null>(null);

  useEffect(() => {
    const getListing = async (): Promise<void> => {
      if (!id || !(uuidRegex.test(id))) {
        return
      }
      const l = await getListingById(id);
      // console.log(l)
      setListing(l);
    }
    void getListing();
  }, [id])

  if (!id || !(uuidRegex.test(id))) {
    return (<>not found</>)
  }
  return (
    <>
      <Appbar title='View Ticket' />
      <Box sx={{p: '20px'}}>
        {listing ? (<>
          <ListingViewer listing={listing}/>
        </>) : <>not found</>}
      </Box>
    </>
  )
}
