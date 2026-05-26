'use client'
import {Listing} from '../listing';
import {getAllListings} from '../listing/actions';
import {useState, useEffect} from 'react';


export default function TicketList() {
  const empty: Listing[] = [];
  const [listings, setListings] = useState(empty);
  useEffect(() => {
    const getListings = async (): Promise<void> => {
      const l = await getAllListings();
      setListings(l);
    }
    void getListings();
  }, [])
  return (
    <>
      {listings.length > 0 ? listings[0].cerimony : ''}
    </>
  )
}