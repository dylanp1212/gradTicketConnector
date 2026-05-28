import Appbar from '../../components/appbar'
import {Suspense} from 'react';
import ViewTicketContent from './content'

export default function Page() {
  return (
    <>
      <Appbar title='View Ticket' />
      <Suspense>
        <ViewTicketContent />
      </Suspense>
    </>
  )
}
