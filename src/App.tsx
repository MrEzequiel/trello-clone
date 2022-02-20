import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Board from './components/Board'
import Header from './components/Header'
import BoardProvider from './context/BoardContext'

import { GlobalStyles } from './styles/GlobalStyles'

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardProvider>
        <Header />
        <Board />
        <GlobalStyles />
      </BoardProvider>
    </DndProvider>
  )
}

export default App
