import React from 'react'
import { DndProvider } from 'react-dnd'
import Board from './components/Board'
import Header from './components/Header'
import BoardProvider from './context/BoardContext'

import { getDndBackend, getDndOptions } from './utils/dndBackend'

import { GlobalStyles } from './styles/GlobalStyles'

const App: React.FC = () => {
  return (
    <DndProvider backend={getDndBackend()} options={getDndOptions()}>
      <BoardProvider>
        <Header />
        <Board />
        <GlobalStyles />
      </BoardProvider>
    </DndProvider>
  )
}

export default App
