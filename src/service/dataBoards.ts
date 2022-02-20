import IBoard from '../interfaces/Board'

const DataBoards: IBoard[] = [
  {
    id: '1',
    title: 'To Do',
    icon: '📝',
    cards: [
      {
        id: '1',
        name: 'Create a new project'
      }
    ]
  },

  {
    id: '2',
    title: 'In Progress',
    icon: '⏳',
    cards: [
      {
        id: '2',
        name: 'Create a trello clone'
      },
      {
        id: '3',
        name: 'Add a new feature'
      }
    ]
  },

  {
    id: '3',
    title: 'Done',
    icon: '✅',
    cards: [
      {
        id: '4',
        name: 'Create a tier list'
      }
    ]
  },

  {
    id: '4',
    title: 'Cancelled',
    icon: '❌',
    cards: [
      {
        id: '5',
        name: 'Port the project to Vue'
      }
    ]
  }
]

export default DataBoards
