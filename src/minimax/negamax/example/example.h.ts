import { IMove, IPlayer } from '../negamax.h'

export interface ITicTacToePlayer extends IPlayer {
  id: string
}

export interface ITicTacToeNode {
  x: number
  y: number
}

export interface ITicTacToeMove extends IMove {
  to: ITicTacToeNode
}

export interface ITicTacToeOccupiedNode {
  node: ITicTacToeNode
  byPlayer: ITicTacToePlayer
}
