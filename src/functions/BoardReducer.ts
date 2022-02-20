import produce from 'immer'
import IBoard from '../interfaces/Board'
import { BoardActions, Types } from '../interfaces/TypesReducer'

const TodoListReducer = (boardData: IBoard[], action: BoardActions) => {
  switch (action.type) {
    case Types.Move_Column: {
      const { indexFrom, indexTo } = action.payload

      return produce(boardData, draft => {
        const dragged = draft[indexFrom]

        draft.splice(indexFrom, 1)
        draft.splice(indexTo, 0, dragged)
      })
    }

    default: {
      return boardData
    }
  }
}

export default TodoListReducer
