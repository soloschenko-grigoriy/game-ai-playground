import { IBoard, IMove } from '../negamax.h'
import { ITicTacToeMove, ITicTacToePlayer } from './example.h'

export class TicTacToeBoard implements IBoard {
  private readonly _nodes: string[][]

  private _player: ITicTacToePlayer

  public get nodes(): string[][] {
    return [...this._nodes.map((row) => [...row])]
  }

  constructor(
    private readonly _player1: ITicTacToePlayer,
    private readonly _player2: ITicTacToePlayer,

    nodes?: string[][],
  ) {
    this._player = _player1
    this._nodes = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ]

    if (nodes) {
      this._nodes = nodes
    }
  }

  public getMoves(): ITicTacToeMove[] {
    let emptyNodes: ITicTacToeMove[] = []
    for (let x = 0; x < this._nodes.length; x++) {
      for (let y = 0; y < this._nodes[x].length; y++) {
        if (this.isEmptyNode(y, x)) {
          emptyNodes.push({ x, y })
        }
      }
    }

    return emptyNodes
  }

  public makeMove({ x, y }: ITicTacToeMove): TicTacToeBoard {
    if (!this.isEmptyNode(y, x)) {
      throw new Error(`Invalid move: ${x}, ${y}, \n${this.toString()}`)
    }

    this._nodes[y][x] = this._player.id

    this._player = this.getNextPlayer()

    return this.clone()
  }

  public evaluate(): number {
    let score = 0

    score += this.evaluateRows()
    score += this.evaluateColumns()

    score += this.evaluateMainDiagonal()
    score += this.evaluateSecondaryDiagonal()

    return score
  }

  public evaluateRows(): number {
    let score = 0

    for (let i = 0; i < 3; i++) {
      score += this.scoreRow(i, this._player)
      score -= this.scoreRow(i, this.getNextPlayer())
    }

    return score
  }

  public evaluateColumns(): number {
    let score = 0
    for (let i = 0; i < 3; i++) {
      score += this.scoreColumn(i, this._player)
      score -= this.scoreColumn(i, this.getNextPlayer())
    }

    return score
  }

  public evaluateMainDiagonal(): number {
    let score = 0

    score += this.scoreMainDiagonal(this._player)
    score -= this.scoreMainDiagonal(this.getNextPlayer())

    return score
  }

  public evaluateSecondaryDiagonal(): number {
    let score = 0

    score += this.scoreSecondaryDiagonal(this._player)
    score -= this.scoreSecondaryDiagonal(this.getNextPlayer())

    return score
  }

  public currentPlayer(): ITicTacToePlayer {
    return this._player
  }

  public isGameOver(): boolean {
    if (!this._nodes.some((row) => row.some((node) => !node.trim()))) {
      return true
    }

    for (let j = 0; j < 2; j++) {
      let player = j === 0 ? this._player : this.getNextPlayer()

      for (let i = 0; i < 3; i++) {
        if (this.countPlayerNodesInRow(i, player) === 3) {
          return true
        }

        if (this.countPlayerNodesInColumn(i, player) === 3) {
          return true
        }
      }

      if (this.countPlayerNodesInMainDiagonal(player) === 3) {
        return true
      }

      if (this.countPlayerNodesInSecondaryDiagonal(player) === 3) {
        return true
      }
    }

    return false
  }

  public toString(): string {
    return this._nodes.map((row) => row.join('|')).join('\n')
  }

  public clone(): TicTacToeBoard {
    return new TicTacToeBoard(this._player1, this._player2, this.nodes)
  }

  private getNextPlayer(): ITicTacToePlayer {
    return this.getOppositePlayer(this._player)
  }

  private isEmptyNode(x: number, y: number): boolean {
    return !this._nodes[x][y].trim()
  }

  private countPlayerNodesInRow(i: number, player: ITicTacToePlayer): number {
    return this._nodes[i].filter((n) => n === player.id).length
  }

  private countPlayerNodesInColumn(i: number, player: ITicTacToePlayer): number {
    return this._nodes.filter((n) => n[i] === player.id).length
  }

  private countPlayerNodesInMainDiagonal(player: ITicTacToePlayer): number {
    return this._nodes.filter((n, i) => n[i] === player.id).length
  }

  private countPlayerNodesInSecondaryDiagonal(player: ITicTacToePlayer): number {
    return this._nodes.filter((n, i) => n[2 - i] === player.id).length
  }

  private scoreRow(i: number, player: ITicTacToePlayer): number {
    if (this._nodes[i].some((n) => n === this.getOppositePlayer(player).id)) {
      return 0
    }

    return 1
  }

  private scoreColumn(i: number, player: ITicTacToePlayer): number {
    if (this._nodes.some((n) => n[i] === this.getOppositePlayer(player).id)) {
      return 0
    }

    return 1
  }

  private scoreMainDiagonal(player: ITicTacToePlayer): number {
    if (this._nodes.some((n, i) => n[i] === this.getOppositePlayer(player).id)) {
      return 0
    }

    return 1
  }

  private scoreSecondaryDiagonal(player: ITicTacToePlayer): number {
    if (this._nodes.some((n, i) => n[2 - i] === this.getOppositePlayer(player).id)) {
      return 0
    }

    return 1
  }

  private getOppositePlayer(player: ITicTacToePlayer): ITicTacToePlayer {
    return player === this._player1 ? this._player2 : this._player1
  }
}
