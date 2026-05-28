'use client'

import {createContext, useState, React} from 'react';

interface messagecontexttype {
  currconvo: string
  setCurrconvo: React.Dispatch<React.SetStateAction<string>>
  refresh: number
  setRefresh: React.Dispatch<React.SetStateAction<number>>
}

const Messagecontext = createContext<messagecontexttype|null>(null);


function Messageprovider(props: {children: React.ReactNode}) {
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