import { IBoard } from '../negamax.h'
import { ITicTacToeMove, ITicTacToeNode, ITicTacToeOccupiedNode, ITicTacToePlayer } from './example.h'

export class TicTacToeBoard implements IBoard {
  private readonly _nodes: ITicTacToeNode[] = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },

    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },

    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ]

  private _emptyNodes: ITicTacToeNode[] = this._nodes

  private _occupiedNodes: ITicTacToeOccupiedNode[] = []

  constructor(private readonly _players: ITicTacToePlayer[], private _player: ITicTacToePlayer) {
    this._emptyNodes = this._nodes
    this._occupiedNodes = []
  }

  public getMoves(): ITicTacToeMove[] {
    return this._emptyNodes.map((node) => ({ to: node, byPlayer: this._player }))
  }

  public makeMove(move: ITicTacToeMove): TicTacToeBoard {
    this._emptyNodes = this._emptyNodes.filter((node) => node !== move.to)
    this._occupiedNodes.push({ node: move.to, byPlayer: this._player })

    this._player = this._players.find((player) => player !== this._player)!

    return this
  }

  private CalcScoreForPlayerNodes(nodes: ITicTacToeOccupiedNode[]): number {
    if (nodes.length === 3) {
      return 100
    }

    if (nodes.length === 2) {
      return 10
    }

    if (nodes.length === 1) {
      return 1
    }

    return 0
  }

  private CalcScoreForOpponentNodes(nodes: ITicTacToeOccupiedNode[]): number {
    if (nodes.length === 3) {
      return 100
    }

    if (nodes.length === 2) {
      return 10
    }

    if (nodes.length === 1) {
      return 1
    }

    return 0
  }

  private getNodesInRow(playerNodes: ITicTacToeOccupiedNode[], i: number): ITicTacToeOccupiedNode[] {
    return playerNodes.filter((n) => n.node.x === i)
  }

  private getNodesInColumn(playerNodes: ITicTacToeOccupiedNode[], i: number): ITicTacToeOccupiedNode[] {
    return playerNodes.filter((n) => n.node.y === i)
  }

  private getNodesInDiag(playerNodes: ITicTacToeOccupiedNode[]): ITicTacToeOccupiedNode[] {
    return playerNodes.filter(
      (n) => n.node.x === n.node.y || (n.node.x === 2 && n.node.y === 0) || (n.node.x === 0 && n.node.y === 2),
    )
  }

  public evaluate(): number {
    const playerNodes = this._occupiedNodes.filter((node) => node.byPlayer === this._player)
    const opponentNodes = this._occupiedNodes.filter((node) => node.byPlayer !== this._player)

    let score = 0

    for (let i = 0; i < 3; i++) {
      score += this.CalcScoreForPlayerNodes(this.getNodesInRow(playerNodes, i))
      score -= this.CalcScoreForOpponentNodes(this.getNodesInRow(opponentNodes, i))
      score += this.CalcScoreForPlayerNodes(this.getNodesInColumn(playerNodes, i))
      score -= this.CalcScoreForOpponentNodes(this.getNodesInColumn(opponentNodes, i))
    }

    score += this.CalcScoreForPlayerNodes(this.getNodesInDiag(playerNodes))
    score -= this.CalcScoreForOpponentNodes(this.getNodesInDiag(opponentNodes))

    return score
  }

  public currentPlayer(): ITicTacToePlayer {
    return this._player
  }

  public isGameOver(): boolean {
    if (this._emptyNodes.length === 0) {
      return true
    }

    const playerNodes = this._occupiedNodes.filter((node) => node.byPlayer === this._player)
    const opponentNodes = this._occupiedNodes.filter((node) => node.byPlayer !== this._player)

    for (let i = 0; i < 3; i++) {
      if (this.getNodesInRow(playerNodes, i).length === 3) {
        return true
      }

      if (this.getNodesInRow(opponentNodes, i).length === 3) {
        return true
      }

      if (this.getNodesInColumn(playerNodes, i).length === 3) {
        return true
      }

      if (this.getNodesInColumn(opponentNodes, i).length === 3) {
        return true
      }
    }

    if (this.getNodesInDiag(playerNodes).length === 3) {
      return true
    }

    if (this.getNodesInDiag(opponentNodes).length === 3) {
      return true
    }

    return false
  }

  public getState(): string[][] {
    const grid = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ]

    for (let node of this._occupiedNodes) {
      grid[node.node.y][node.node.x] = node.byPlayer.id.toString()
    }

    return grid
  }

  public toString(): string {
    return this.getState()
      .map((row) => row.join('|'))
      .join('\n')
  }

  public clone(): TicTacToeBoard {
    const board = new TicTacToeBoard(this._players, this._player)

    board._emptyNodes = [...this._emptyNodes]
    board._occupiedNodes = [...this._occupiedNodes]

    return board
  }
}
