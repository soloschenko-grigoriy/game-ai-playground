import { IMove, IPlayer } from '../negamax.h'

export interface ITicTacToePlayer extends IPlayer {
  id: string
}

export interface ITicTacToeMove extends IMove {
  x: number
  y: number
}