import React from 'react'
import DataBoards from '../../service/dataBoards'
import ColumnBoard from './ColumnBoard'

import { BoardSection, BoardTitle, BoardWrapper } from './style'

const Board: React.FC = () => {
  return (
    <BoardSection>
      <BoardTitle>My Board</BoardTitle>

      <BoardWrapper>
        {DataBoards.map((board, indexBoard) => (
          <ColumnBoard key={board.id} {...board} indexColumn={indexBoard} />
        ))}
      </BoardWrapper>
    </BoardSection>
  )
}

export default Board
