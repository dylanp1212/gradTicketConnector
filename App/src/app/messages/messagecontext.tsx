'use client'

import {createContext, useState, ReactNode, Dispatch, SetStateAction} from 'react';

interface messagecontexttype {
  currconvo: string | null
  setCurrconvo: Dispatch<SetStateAction<string|null>>
  refresh: number
  setRefresh: Dispatch<SetStateAction<number>>
}

const Messagecontext = createContext<messagecontexttype|null>(null);


function Messageprovider(props: {children: ReactNode}) {
  const [currconvo, setCurrconvo] = useState<string|null>(null)
  const [refresh, setRefresh] = useState(0)
  const context = {currconvo, setCurrconvo, refresh, setRefresh};
  return (
    <Messagecontext.Provider value={context}>
      {props.children}
    </Messagecontext.Provider>
  );
}

export {Messageprovider, Messagecontext};