import { IMove, IPlayer } from '../memory-enhanced-test.h'

export interface ITicTacToePlayer extends IPlayer {
  id: string
}

export interface ITicTacToeMove extends IMove {
  x: number
  y: number
}
