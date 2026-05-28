'use client'

import {Listing, Options} from '../listing';
import {getAllListings} from '../listing/actions';
import {getSessionUser} from '../auth/actions';
import {SessionUser} from '../auth';
import {useState, useEffect} from 'react';
import TicketListItem from './ticketListItem'
import NoMatches from './noMatches'


export default function TicketList({options}: {options: Options}) {
  const empty: Listing[] = [];
  const [listings, setListings] = useState(empty);
  const [user, setUser] = useState<SessionUser | undefined>(undefined)
  useEffect(() => {
    getSessionUser().then(setUser)
  }, [])
  useEffect(() => {
    const getListings = async (): Promise<void> => {
      // console.log(options)
      const l = await getAllListings(options);
      // console.log(l)
      setListings(l);
    }
    void getListings();
  }, [options])
  return (
    <>
      {listings.map((l, i) => (
        <TicketListItem key={i} listing={l} user={user} />
      ))}
      {listings.length == 0 ? <NoMatches /> : ''}
    </>
  )
}