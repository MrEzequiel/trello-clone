import React, { memo, useEffect, useRef, useState } from 'react'
import IBoard from '../../../interfaces/Board'
import { useDrag, useDrop, XYCoord } from 'react-dnd'
import Card from '../Card'
import type { Identifier } from 'dnd-core'

import {
  ColumnWrapper,
  ColumnHeader,
  ColumnDragHandle,
  ColumnBody,
  ColumnFooter,
  FormAddCard
} from './style'
import { MdDragIndicator, MdAdd } from 'react-icons/md'
import { IDragCard, IDragColumn } from '../../../interfaces/DragItem'
import useBoard from '../../../hook/useBoard'
import { Types } from '../../../interfaces/TypesReducer'
import { getEmptyImage } from 'react-dnd-html5-backend'

interface IProps extends IBoard {
  indexColumn: number
  isLayer?: boolean
  [x: string]: any
}

const ColumnBoard: React.FC<IProps> = ({
  title,
  icon,
  cards,
  id,
  indexColumn,
  isLayer = false,
  ...props
}) => {
  const columnRef = useRef<HTMLLIElement | null>(null)
  const cardInputRef = useRef<HTMLInputElement | null>(null)
  const [nameCard, setNameCard] = useState('')

  const { dispatch, boardListData } = useBoard()

  const [isAddingCard, setIsAddingCard] = useState(false)

  const handleAddCard = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (nameCard.trim() === '') {
      return
    }

    dispatch({
      type: Types.Create_Card,
      payload: {
        idColumn: id,
        name: nameCard
      }
    })
    handleCloseAddCard()
  }

  const handleCloseAddCard = () => {
    setIsAddingCard(false)
    setNameCard('')
  }

  const handleShowAddCard = () => {
    setIsAddingCard(true)
    if (cardInputRef.current) cardInputRef.current.focus()
  }

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'COLUMN',
    item: () => ({
      id,
      indexColumn,
      width: columnRef!.current?.offsetWidth,
      height: columnRef!.current?.offsetHeight
    }),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    isDragging: monitor => monitor.getItem().id === id
  })

  const [{ handlerColumnBodyId, canDrop }, dropColumnBody] = useDrop<
    IDragCard,
    void,
    { handlerColumnBodyId: Identifier | null; canDrop: boolean }
  >({
    accept: 'CARD',
    collect: monitor => ({
      handlerColumnBodyId: monitor.getHandlerId(),
      canDrop: monitor.isOver()
    }),
    hover(item) {
      const dragIndex = item.indexCard
      const dragColumn = item.indexColumn

      const hoverIndex = indexColumn

      if (dragColumn === hoverIndex) return

      dispatch({
        type: Types.Add_Card_To_Column,
        payload: {
          index: dragIndex,
          indexColumn: dragColumn,
          indexToColumn: hoverIndex
        }
      })

      item.indexColumn = hoverIndex
      item.indexCard = boardListData[indexColumn].cards.length
    }
  })

  const [{ handlerId }, drop] = useDrop<
    IDragColumn,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'COLUMN',
    collect: monitor => ({
      handlerId: monitor.getHandlerId()
    }),
    hover(item, monitor) {
      if (!columnRef.current) return

      const dragIndex = item.indexColumn
      const hoverIndex = indexColumn

      if (dragIndex === hoverIndex) return

      const { x: itemDragX } = monitor.getClientOffset() as XYCoord
      const itemHover = columnRef.current.getBoundingClientRect()
      const middleItemHover = columnRef.current.offsetWidth / 2 + itemHover.x

      if (itemDragX < middleItemHover && dragIndex < hoverIndex) return
      if (itemDragX > middleItemHover && dragIndex > hoverIndex) return

      dispatch({
        type: Types.Move_Column,
        payload: {
          indexFrom: dragIndex,
          indexTo: hoverIndex
        }
      })

      item.indexColumn = hoverIndex
    }
  })

  drop(columnRef)

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, [preview])

  return (
    <ColumnWrapper
      ref={columnRef}
      isDragging={!isLayer && isDragging}
      isLayer={isLayer}
      data-handler-id={handlerId}
      {...props}
    >
      <ColumnHeader>
        <h3>
          <span>{icon}</span> {title}
        </h3>

        <ColumnDragHandle ref={drag}>
          <MdDragIndicator />
        </ColumnDragHandle>
      </ColumnHeader>

      <ColumnBody
        canDrop={canDrop}
        data-handler-id={handlerColumnBodyId}
        ref={dropColumnBody}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            {...card}
            indexCard={index}
            indexColumn={indexColumn}
          />
        ))}
      </ColumnBody>

      <ColumnFooter>
        {isAddingCard ? (
          <FormAddCard onSubmit={handleAddCard}>
            <input
              type="text"
              placeholder="Enter a name for the card"
              ref={cardInputRef}
              onBlur={() => setTimeout(handleCloseAddCard, 200)}
              value={nameCard}
              onChange={e => setNameCard(e.target.value)}
            />
            <button type="submit">
              <MdAdd />
            </button>
          </FormAddCard>
        ) : (
          <button type="button" onClick={handleShowAddCard}>
            <MdAdd /> Add a card
          </button>
        )}
      </ColumnFooter>
    </ColumnWrapper>
  )
}

export default memo(ColumnBoard)
