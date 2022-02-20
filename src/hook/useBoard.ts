import { useContext } from 'react'
import { BoardContext } from '../context/BoardContext'

const useBoard = () => {
  const ctx = useContext(BoardContext)
  return ctx
}

export default useBoard
