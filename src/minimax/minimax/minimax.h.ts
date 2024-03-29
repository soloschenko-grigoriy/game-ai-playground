export interface IBoard {
  getMoves(): IMove[]
  makeMove(move: IMove): IBoard
  evaluate(player: IPlayer): number
  currentPlayer(): IPlayer
  isGameOver(): boolean
}

export interface IPlayer {}

export interface IMove {}

export interface IResult {
  score: number
  move: IMove | null
}
