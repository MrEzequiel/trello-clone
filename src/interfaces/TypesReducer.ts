type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key

        payload: M[Key]
      }
}

export enum Types {
  Move_Column = 'Move_Column', // eslint-disable-line
  Move_Card = 'Move_Card', // eslint-disable-line
  Add_Card_To_Column = 'Add_Card_To_Column', // eslint-disable-line
  Create_Column = 'Create_Column', // eslint-disable-line
  Create_Card = 'Create_Card' // eslint-disable-line
}

type BoardPayload = {
  [Types.Move_Column]: {
    indexFrom: number
    indexTo: number
  }
  [Types.Move_Card]: {
    indexFrom: number
    indexFromColumn: number
    indexTo: number
    indexToColumn: number
  }
  [Types.Add_Card_To_Column]: {
    index: number
    indexColumn: number
    indexToColumn: number
  }
  [Types.Create_Column]: {
    name: string
  }
  [Types.Create_Card]: {
    name: string
    idColumn: string
  }
}

export type BoardActions =
  ActionMap<BoardPayload>[keyof ActionMap<BoardPayload>]
