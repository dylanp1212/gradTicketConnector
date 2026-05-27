'use client'
import ConvoListItem from './convoListItem'
import {useState, useEffect} from 'react'
import {getAllConvos} from '../message/actions'
import {getSessionUser} from '../auth/actions';

export default function ConvoList() {
  const empty: string[] = []
  const [convos, setConvos] = useState(empty)
  useEffect (() => {
    const getConvos = async (): Promise<void> => {
      const user = await getSessionUser();
      if (!user) return;
      const c = await getAllConvos(user.id);
      setConvos(c);
    }
    void getConvos();
  }, [])
  return (
    <>
      {convos.map((c, i) => (
        <ConvoListItem key={i} id={c} />
      ))}
    </>
  )
}