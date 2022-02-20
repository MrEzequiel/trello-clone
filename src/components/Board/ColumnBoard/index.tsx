import React from 'react'
import IBoard from '../../../interfaces/Board'
import { MdDragIndicator, MdAdd } from 'react-icons/md'

import {
  ColumnWrapper,
  ColumnHeader,
  ColumnDragHandle,
  ColumnBody,
  ColumnFooter
} from './style'
import Card from '../Card'

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
  return (
    <ColumnWrapper>
      <ColumnHeader>
        <h3>
          <span>{icon}</span> {title}
        </h3>

        <ColumnDragHandle>
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
