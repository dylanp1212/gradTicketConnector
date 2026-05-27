'use client'
import {Listing} from '../listing';
import {getAllListings} from '../listing/actions';
import {useState, useEffect} from 'react';
import TicketListItem from './ticketListItem'


export default function TicketList() {
  const empty: Listing[] = [];
  const [listings, setListings] = useState(empty);
  useEffect(() => {
    const getListings = async (): Promise<void> => {
      const l = await getAllListings({ceremonies: ['baskin', 'crown'], method: ['sell']});
      // console.log(l)
      setListings(l);
    }
    void getListings();
  }, [])
  return (
    <>
      {listings.map((l, i) => (
        <TicketListItem key={i} listing={l} />
      ))}
    </>
  )
}