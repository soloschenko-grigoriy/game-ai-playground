import { IMove } from '../negamax'

export interface ITableEntry {
  hashValue: number
  scoreType: ScoreType
  score: number
  bestMove: IMove
  depth: number
}

export enum ScoreType {
  Accurate,
  FailLow,
  FailHigh,
}
