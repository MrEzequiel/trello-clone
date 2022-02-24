import React, { createContext } from 'react'

export interface IContext {
  ref: React.MutableRefObject<HTMLUListElement | null>
}

const ContextRef = createContext<IContext>({} as IContext)

export default ContextRef
