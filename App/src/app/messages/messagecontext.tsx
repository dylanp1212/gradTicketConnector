'use client'

import {createContext, useState} from 'react';

interface messagecontexttype {
  currconvo: string
  setCurrconvo: React.Dispatch<React.SetStateAction<string>>
}

const Messagecontext = createContext<messagecontexttype|null>(null);


function Messageprovider(props: {children: React.ReactNode}) {
  const [currconvo, setCurrconvo] = useState<string|null>(null)
  const context = {currconvo, setCurrconvo};
  return (
    <Messagecontext.Provider value={context}>
      {props.children}
    </Messagecontext.Provider>
  );
}

export {Messageprovider, Messagecontext};