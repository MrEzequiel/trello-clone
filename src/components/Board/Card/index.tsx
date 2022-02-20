import React from 'react'

import ICard from '../../../interfaces/Card'
import { CardWrapper } from './style'

interface ICardProps extends ICard {
  indexColumn: number
  indexCard: number
}

const Card: React.FC<ICardProps> = ({ name, id, indexCard, indexColumn }) => {
  return <CardWrapper>{name}</CardWrapper>
}

export default Card
