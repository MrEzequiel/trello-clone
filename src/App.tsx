import React from 'react'
import Board from './components/Board'
import Header from './components/Header'

import { GlobalStyles } from './styles/GlobalStyles'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Board />
      <GlobalStyles />
    </>
  )
}

export default App
