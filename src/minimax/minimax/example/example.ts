import { IBoard } from '../minimax.h'
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
    this._occupiedNodes.push({ node: move.to, byPlayer: move.byPlayer })

    this._player = this._players.find((player) => player !== this._player)!

    return this
  }

  // assume its regular tic-tac-toe with 3x3 grid

  // generate tests for this method 
  public evaluate(player: ITicTacToePlayer): number {
    const playerNodes = this._occupiedNodes.filter((node) => node.byPlayer === player)
    const opponentNodes = this._occupiedNodes.filter((node) => node.byPlayer !== player)

    for (let x = 0; x < 3; x++) {
      if (playerNodes.filter((n) => n.node.x === x).length === 3) {
        return 1
      }

      if (opponentNodes.filter((n) => n.node.x === x).length === 3) {
        return -1
      }
    }

    for (let y = 0; y < 3; y++) {
      if (playerNodes.filter((n) => n.node.y === y).length === 3) {
        return 1
      }
      if (opponentNodes.filter((n) => n.node.y === y).length === 3) {
        return -1
      }
    }

    for (let i = 0; i < 3; i++) {
      if (playerNodes.filter((n) => n.node.x === n.node.y).length === 3) {
        return 1
      }
      if (opponentNodes.filter((n) => n.node.x === n.node.y).length === 3) {
        return -1
      }
    }

    return 0
  }

  public currentPlayer(): ITicTacToePlayer {
    return this._player
  }

  public isGameOver(): boolean {
    return this._emptyNodes.length === 0
  }
}
