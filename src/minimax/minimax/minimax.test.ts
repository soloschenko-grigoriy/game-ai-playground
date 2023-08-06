import { minimax } from './minimax'
import { IBoard, IMove, IPlayer } from './minimax.h'

describe('minimax', () => {
  describe('in tic-tac-toe', () => {
    interface ITicTacToePlayer extends IPlayer {
      id: number
    }

    interface ITicTacToeNode {
      x: number
      y: number
    }

    interface ITicTacToeMove extends IMove {
      to: ITicTacToeNode
      byPlayer: ITicTacToePlayer
    }

    interface ITicTacToeOccupiedNode {
      node: ITicTacToeNode
      byPlayer: ITicTacToePlayer
    }

    class TicTacToeBoard implements IBoard {
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

      public evaluate(player: ITicTacToePlayer): number {
        return this._occupiedNodes.filter((node) => node.byPlayer === player).length
      }

      public currentPlayer(): ITicTacToePlayer {
        return this._player
      }

      public isGameOver(): boolean {
        return this._emptyNodes.length === 0
      }
    }

    it('should return the best score and a move', () => {
      const maxDepth = 3

      const player1: ITicTacToePlayer = {
        id: 1,
      }

      const player2: ITicTacToePlayer = {
        id: 2,
      }

      const { score, move } = minimax(new TicTacToeBoard([player1, player2], player1), player1, maxDepth, 0)

      // expect(score).toBe(3)
      expect(move).toEqual({ to: { x: 0, y: 0 }, byPlayer: player1 })
    })
  })
})
