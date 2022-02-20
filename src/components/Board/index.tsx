import React from 'react'
import useBoard from '../../hook/useBoard'
import ColumnBoard from './ColumnBoard'

import { BoardSection, BoardTitle, BoardWrapper, BoardContainer } from './style'

const Board: React.FC = () => {
  const { boardListData } = useBoard()

  return (
    <BoardSection>
      <BoardTitle>My Board</BoardTitle>

      <BoardContainer>
        <BoardWrapper>
          {boardListData.map((board, indexBoard) => (
            <ColumnBoard key={board.id} {...board} indexColumn={indexBoard} />
          ))}
        </BoardWrapper>
      </BoardContainer>
    </BoardSection>
  )
}

export default Board
