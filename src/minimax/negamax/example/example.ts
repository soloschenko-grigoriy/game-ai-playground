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

    for (let i = 0; i < 3; i++) {
      score += this.CalcScoreForPlayerNodes(this.getNodesInRow(i, this._player))
      score -= this.CalcScoreForOpponentNodes(this.getNodesInRow(i, this.getNextPlayer()))
      score += this.CalcScoreForPlayerNodes(this.getNodesInColumn(i, this._player))
      score -= this.CalcScoreForOpponentNodes(this.getNodesInColumn(i, this.getNextPlayer()))
    }

    score += this.CalcScoreForPlayerNodes(this.getNodesInMainDiagonal(this._player))
    score -= this.CalcScoreForOpponentNodes(this.getNodesInMainDiagonal(this.getNextPlayer()))

    score += this.CalcScoreForPlayerNodes(this.getNodesInSecondaryDiagonal(this._player))
    score -= this.CalcScoreForOpponentNodes(this.getNodesInSecondaryDiagonal(this.getNextPlayer()))

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
        if (this.getNodesInRow(i, player).length === 3) {
          return true
        }

        if (this.getNodesInColumn(i, player).length === 3) {
          return true
        }
      }

      if (this.getNodesInMainDiagonal(player).length === 3) {
        return true
      }

      if (this.getNodesInSecondaryDiagonal(player).length === 3) {
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
    return this._player === this._player1 ? this._player2 : this._player1
  }

  private CalcScoreForPlayerNodes(nodes: string[]): number {
    if (nodes.length === 3) {
      return 100
    }

    if (nodes.length === 2) {
      return 10
    }

    return 0
  }

  private CalcScoreForOpponentNodes(nodes: string[]): number {
    if (nodes.length === 3) {
      return 100
    }

    if (nodes.length === 2) {
      return 10
    }

    return 0
  }

  private getNodesInRow(i: number, player: ITicTacToePlayer): string[] {
    return this._nodes[i].filter((n) => n === player.id)
  }

  private getNodesInColumn(i: number, player: ITicTacToePlayer): string[] {
    return this._nodes.filter((n) => n[i] === player.id).map((n) => n[i])
  }

  private getNodesInMainDiagonal(player: ITicTacToePlayer): string[] {
    return this._nodes.filter((n, i) => n[i] === player.id).map((n, i) => n[i])
  }

  private getNodesInSecondaryDiagonal(player: ITicTacToePlayer): string[] {
    return this._nodes.filter((n, i) => n[2 - i] === player.id).map((n, i) => n[2 - i])
  }

  private isEmptyNode(x: number, y: number): boolean {
    return !this._nodes[x][y].trim()
  }
}
