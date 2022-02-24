import { v4 as uuidv4 } from 'uuid'

import IBoard from '../interfaces/Board'

const DataBoards: IBoard[] = [
  {
    id: uuidv4(),
    title: 'To Do',
    icon: '📝',
    cards: [
      {
        id: uuidv4(),
        name: 'Create a new project'
      }
    ]
  },

  {
    id: uuidv4(),
    title: 'In Progress',
    icon: '⏳',
    cards: [
      {
        id: uuidv4(),
        name: 'Create a trello clone'
      },
      {
        id: uuidv4(),
        name: 'Add a new feature'
      }
    ]
  },

  {
    id: uuidv4(),
    title: 'Done',
    icon: '✅',
    cards: [
      {
        id: uuidv4(),
        name: 'Create a tier list'
      }
    ]
  },

  {
    id: uuidv4(),
    title: 'Cancelled',
    icon: '❌',
    cards: [
      {
        id: uuidv4(),
        name: 'Port the project to Vue'
      }
    ]
  }
]

export default DataBoards
