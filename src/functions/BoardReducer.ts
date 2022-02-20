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

    case Types.Move_Card: {
      const { indexFrom, indexFromColumn, indexTo, indexToColumn } =
        action.payload

      return produce(boardData, draft => {
        const dragged = draft[indexFromColumn].cards[indexFrom]

        draft[indexFromColumn].cards.splice(indexFrom, 1)
        draft[indexToColumn].cards.splice(indexTo, 0, dragged)
      })
    }

    case Types.Add_Card_To_Column: {
      const { index, indexColumn, indexToColumn } = action.payload

      return produce(boardData, draft => {
        const dragged = draft[indexColumn].cards[index]

        draft[indexColumn].cards.splice(index, 1)
        draft[indexToColumn].cards.push(dragged)
      })
    }

    default: {
      return boardData
    }
  }
}

export default TodoListReducer
