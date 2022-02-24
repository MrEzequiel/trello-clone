import produce, { setAutoFreeze } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import IBoard from '../interfaces/Board'
import ICard from '../interfaces/Card'
import { BoardActions, Types } from '../interfaces/TypesReducer'

const TodoListReducer = (boardData: IBoard[], action: BoardActions) => {
  switch (action.type) {
    case Types.Move_Column: {
      const { indexFrom, indexTo } = action.payload

      return produce(boardData, draft => {
        setAutoFreeze(false)
        const dragged = draft[indexFrom]

        draft.splice(indexFrom, 1)
        draft.splice(indexTo, 0, dragged)
      })
    }

    case Types.Move_Card: {
      const { indexFrom, indexFromColumn, indexTo, indexToColumn } =
        action.payload

      return produce(boardData, draft => {
        setAutoFreeze(false)
        const dragged = draft[indexFromColumn].cards[indexFrom]

        draft[indexFromColumn].cards.splice(indexFrom, 1)
        draft[indexToColumn].cards.splice(indexTo, 0, dragged)
      })
    }

    case Types.Add_Card_To_Column: {
      setAutoFreeze(false)
      const { index, indexColumn, indexToColumn } = action.payload

      return produce(boardData, draft => {
        const dragged = draft[indexColumn].cards[index]

        draft[indexColumn].cards.splice(index, 1)
        draft[indexToColumn].cards.push(dragged)
      })
    }

    case Types.Create_Column: {
      const { name } = action.payload

      const newColumn: IBoard = {
        id: uuidv4(),
        title: name,
        icon: '📌',
        cards: []
      }

      return [...boardData, newColumn]
    }

    case Types.Create_Card: {
      const { name, idColumn } = action.payload

      return boardData.map(board => {
        if (board.id !== idColumn) return board

        const newCard: ICard = {
          id: uuidv4(),
          name
        }

        board.cards = [...board.cards, newCard]
        return board
      })
    }

    default: {
      return boardData
    }
  }
}

export default TodoListReducer
