import React, { useRef, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import useBoard from '../../hook/useBoard'
import { Types } from '../../interfaces/TypesReducer'
import ColumnBoard from './ColumnBoard'
import DragLayer from './DragLayer'

import {
  BoardSection,
  BoardTitle,
  BoardWrapper,
  BoardContainer,
  AddColumn,
  FormAddColumn
} from './style'

const Board: React.FC = () => {
  const { boardListData, dispatch } = useBoard()

  const [nameColumn, setNameColumn] = useState('')
  const inputNameColumnRef = useRef<HTMLInputElement | null>(null)
  const [isShowInput, setIsShowInput] = useState(false)

  const handleSubmitAddColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nameColumn.trim() === '') {
      inputNameColumnRef.current?.focus()
      return
    }

    dispatch({ type: Types.Create_Column, payload: { name: nameColumn } })
    setNameColumn('')
    setIsShowInput(false)
  }

  return (
    <>
      <BoardSection>
        <BoardTitle>My Board</BoardTitle>

        <BoardContainer>
          <BoardWrapper>
            {boardListData.map((board, indexBoard) => (
              <ColumnBoard key={board.id} {...board} indexColumn={indexBoard} />
            ))}

            <AddColumn>
              {isShowInput ? (
                <FormAddColumn onSubmit={handleSubmitAddColumn}>
                  <input
                    placeholder="Enter column name: "
                    type="text"
                    ref={inputNameColumnRef}
                    value={nameColumn}
                    onChange={e => setNameColumn(e.target.value)}
                  />
                  <button type="submit">
                    <MdAdd size={20} />
                  </button>
                </FormAddColumn>
              ) : (
                <button onClick={() => setIsShowInput(true)}>
                  <MdAdd />
                  Create a column
                </button>
              )}
            </AddColumn>
          </BoardWrapper>
        </BoardContainer>
      </BoardSection>

      <DragLayer />
    </>
  )
}

export default Board
