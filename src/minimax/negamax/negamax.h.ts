export interface IBoard {
  getMoves(): IMove[]
  makeMove(move: IMove): IBoard
  undoMove(move: IMove): IBoard
  evaluate(): number
  isGameOver(): boolean
}

export interface IPlayer {}

export interface IMove {}

export interface IResult {
  score: number
  move: IMove | null
}
