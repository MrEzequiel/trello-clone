import produce from 'immer'
import IBoard from '../interfaces/Board'
import { BoardActions, Types } from '../interfaces/TypesReducer'

const TodoListReducer = (boardData: IBoard[], action: BoardActions) => {
  switch (action.type) {
    case Types.Move_Column: {
      return boardData
    }

    default: {
      return boardData
    }
  }
}

export default TodoListReducer
