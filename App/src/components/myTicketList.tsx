'use client'

import {Listing, Options} from '../listing';
import {getAllListingsByMember} from '../listing/actions';
import {getSessionUser} from '../auth/actions';
import {useState, useEffect} from 'react';
import TicketListItem from './ticketListItem'


export default function MyTicketList({options}: {options: Options}) {
  const empty: Listing[] = [];
  const [mylistings, setMylistings] = useState(empty);
  useEffect(() => {
    const getMyListings = async (): Promise<void> => {
      const user = await getSessionUser();
      if (!user) return;
      const l = await getAllListingsByMember(user.id);
      setMylistings(l);
    }
    void getMyListings();
  }, [])
  return (
    <>
      {mylistings.map((l, i) => (
        <TicketListItem key={i} listing={l} />
      ))}
      {/* {mylistings.length == 0 ? 'you dont have any tickets' : ''} */}
    </>
  )
}