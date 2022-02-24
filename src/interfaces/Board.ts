import ICard from './Card'

interface IBoard {
  id: string
  title: string
  icon: '📝' | '⏳' | '❌' | '✅' | '📌'

  cards: ICard[]
}

export default IBoard
