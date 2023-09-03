export interface IBoard {
  getMoves(): IMove[]
  makeMove(move: IMove): IBoard
  undoMove(move: IMove): IBoard
  evaluate(): number
  isGameOver(): boolean
  getHashValue(): number
}

export interface IPlayer {}

export interface IMove {}

export interface IResult {
  score: number
  move: IMove | null
}

export interface ITableEntry {
  hashValue: number
  depth: number
  minScore: number
  maxScore: number
  bestMove: IMove | null
}
