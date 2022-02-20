import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { MdDragIndicator } from 'react-icons/md'
import ICard from '../../../interfaces/Card'
import { IDragCard } from '../../../interfaces/DragItem'
import type { Identifier } from 'dnd-core'

import { CardDragIndicator, CardWrapper } from './style'
import useBoard from '../../../hook/useBoard'
import { Types } from '../../../interfaces/TypesReducer'

interface ICardProps extends ICard {
  indexColumn: number
  indexCard: number
}

const Card: React.FC<ICardProps> = ({ name, id, indexCard, indexColumn }) => {
  const { dispatch } = useBoard()
  const cardRef = useRef<HTMLLIElement | null>(null)

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'CARD',
    item: () => ({ id, indexColumn, indexCard }),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    isDragging: monitor => monitor.getItem().id === id
  })

  const [{ handlerId }, drop] = useDrop<
    IDragCard,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'CARD',
    collect: monitor => ({
      handlerId: monitor.getHandlerId()
    }),

    hover(item, monitor) {
      const dragIndex = item.indexCard
      const hoverIndex = indexCard

      const dragColumn = item.indexColumn
      const hoverColumn = indexColumn

      if (dragIndex === hoverIndex && dragColumn === hoverColumn) return

      const hoverBoundingRect = cardRef.current!.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      dispatch({
        type: Types.Move_Card,
        payload: {
          indexFrom: dragIndex,
          indexFromColumn: dragColumn,
          indexTo: hoverIndex,
          indexToColumn: hoverColumn
        }
      })

      item.indexCard = hoverIndex
      item.indexColumn = indexColumn
    }
  })

  drop(preview(cardRef))

  return (
    <CardWrapper
      ref={cardRef}
      isDragging={isDragging}
      data-handler-id={handlerId}
    >
      <p>{name}</p>
      <CardDragIndicator ref={drag}>
        <MdDragIndicator />
      </CardDragIndicator>
    </CardWrapper>
  )
}

export default Card
