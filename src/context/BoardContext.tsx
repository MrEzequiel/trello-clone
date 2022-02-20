import { createContext, FC, useReducer } from 'react'
import IBoard from '../interfaces/Board'
import DataBoards from '../service/dataBoards'
import BoardReducer from '../functions/BoardReducer'
import { BoardActions } from '../interfaces/TypesReducer'

interface IBoardContext {
  boardListData: IBoard[]
  dispatch: React.Dispatch<BoardActions>
}

const initialState: IBoard[] = DataBoards

export const BoardContext = createContext({} as IBoardContext)

const BoardProvider: FC = ({ children }) => {
  const [boardListData, dispatch] = useReducer(BoardReducer, initialState)

  return (
    <BoardContext.Provider value={{ boardListData, dispatch }}>
      {children}
    </BoardContext.Provider>
  )
}

export default BoardProvider
