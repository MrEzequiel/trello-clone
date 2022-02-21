import React, { memo, useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { MdDragIndicator } from 'react-icons/md'
import ICard from '../../../interfaces/Card'
import { IDragCard } from '../../../interfaces/DragItem'
import type { Identifier } from 'dnd-core'

import { CardDragIndicator, CardWrapper } from './style'
import useBoard from '../../../hook/useBoard'
import { Types } from '../../../interfaces/TypesReducer'
import { getEmptyImage } from 'react-dnd-html5-backend'

interface ICardProps extends ICard {
  indexColumn: number
  indexCard: number
}

const Card: React.FC<ICardProps> = ({ name, id, indexCard, indexColumn }) => {
  const { dispatch } = useBoard()
  const dropRef = useRef<HTMLLIElement | null>(null)
  const dragRef = useRef<HTMLButtonElement | null>(null)

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'CARD',
    item: () => ({
      id,
      indexColumn,
      indexCard,
      name,
      width: dropRef!.current?.offsetWidth,
      height: dropRef!.current?.offsetHeight
    }),
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

      const hoverBoundingRect = dropRef.current!.getBoundingClientRect()
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

  drop(drag(dropRef))
  drag(dragRef)

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, [preview])

  return (
    <CardWrapper
      isDragging={isDragging}
      ref={dropRef}
      data-handler-id={handlerId}
    >
      <p>{name}</p>
      <CardDragIndicator type="button" ref={dragRef}>
        <MdDragIndicator />
      </CardDragIndicator>
    </CardWrapper>
  )
}

export default memo(Card)
