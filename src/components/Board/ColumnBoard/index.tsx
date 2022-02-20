import React, { useRef } from 'react'
import IBoard from '../../../interfaces/Board'
import { useDrag, useDrop, XYCoord } from 'react-dnd'
import Card from '../Card'
import type { Identifier } from 'dnd-core'

import {
  ColumnWrapper,
  ColumnHeader,
  ColumnDragHandle,
  ColumnBody,
  ColumnFooter
} from './style'
import { MdDragIndicator, MdAdd } from 'react-icons/md'
import { IDragColumn } from '../../../interfaces/DragItem'
import useBoard from '../../../hook/useBoard'
import { Types } from '../../../interfaces/TypesReducer'

interface IProps extends IBoard {
  indexColumn: number
}

const ColumnBoard: React.FC<IProps> = ({
  title,
  icon,
  cards,
  id,
  indexColumn
}) => {
  const columnRef = useRef<HTMLLIElement | null>(null)
  const { dispatch } = useBoard()

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'COLUMN',
    item: () => ({ id, indexColumn }),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    isDragging: monitor => monitor.getItem().id === id
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

  drop(preview(columnRef))

  return (
    <ColumnWrapper
      ref={columnRef}
      isDragging={isDragging}
      data-handler-id={handlerId}
    >
      <ColumnHeader>
        <h3>
          <span>{icon}</span> {title}
        </h3>

        <ColumnDragHandle ref={drag}>
          <MdDragIndicator />
        </ColumnDragHandle>
      </ColumnHeader>

      <ColumnBody>
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
        <button type="button">
          <MdAdd /> Add a card
        </button>
      </ColumnFooter>
    </ColumnWrapper>
  )
}

export default ColumnBoard
