import { IMove, IPlayer } from '../minimax.h'

export interface ITicTacToePlayer extends IPlayer {
  id: number
}

export interface ITicTacToeNode {
  x: number
  y: number
}

export interface ITicTacToeMove extends IMove {
  to: ITicTacToeNode
  byPlayer: ITicTacToePlayer
}

export interface ITicTacToeOccupiedNode {
  node: ITicTacToeNode
  byPlayer: ITicTacToePlayer
}
