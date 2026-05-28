'use client'

import Box from '@mui/material/Box';
import {useSearchParams} from 'next/navigation';
import {useState, useEffect} from 'react';
import {Listing} from '../../listing'
import {getListingById} from '../../listing/actions'
import ListingViewer from '../../components/listingViewer'
import NotFound from '../../components/notFound'

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default function ViewTicketContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? undefined;
  const [listing, setListing] = useState<Listing|null>(null);

  useEffect(() => {
    const getListing = async (): Promise<void> => {
      if (!id || !(uuidRegex.test(id))) {
        return
      }
      const l = await getListingById(id);
      setListing(l);
    }
    void getListing();
  }, [id])

  return (
    <Box sx={{p: '20px'}}>
      {listing && id && (uuidRegex.test(id)) ? (
        <ListingViewer listing={listing}/>
      ) : <NotFound />}
    </Box>
  )
}
