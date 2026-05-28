'use client'

import {Listing} from '../listing';
import {getAllListingsByMember} from '../listing/actions';
import {getSessionUser} from '../auth/actions';
import {SessionUser} from '../auth';
import {useState, useEffect} from 'react';
import TicketListItem from './ticketListItem'


export default function MyTicketList() {
  const [mylistings, setMylistings] = useState<Listing[]>([]);
  const [user, setUser] = useState<SessionUser | undefined>(undefined)
  useEffect(() => {
    const getMyListings = async (): Promise<void> => {
      const u = await getSessionUser();
      if (!u) return;
      setUser(u)
      const l = await getAllListingsByMember(u.id);
      setMylistings(l);
    }
    void getMyListings();
  }, [])
  return (
    <>
      {mylistings.map((l, i) => (
        <TicketListItem key={i} listing={l} user={user} />
      ))}
      {/* {mylistings.length == 0 ? 'you dont have any tickets' : ''} */}
    </>
  )
}