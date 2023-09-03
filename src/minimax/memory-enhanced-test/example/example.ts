import { ZobristKeyTiCTacToe } from '../../zobrist-key'
import { IBoard, IMove, IPlayer } from '../memory-enhanced-test.h'
import { TranspositionTable } from '../transposition-table'
import { ITicTacToeMove, ITicTacToePlayer } from './example.h'

const table = new TranspositionTable(1000000)
const zobristKey = new ZobristKeyTiCTacToe()

export class TicTacToeBoard implements IBoard {
  private readonly _nodes: string[][]
  private _hashValue: number

  public get nodes(): string[][] {
    return [...this._nodes.map((row) => [...row])]
  }

  constructor(
    private readonly _player1: ITicTacToePlayer,
    private readonly _player2: ITicTacToePlayer,
    private _player: ITicTacToePlayer,

    nodes?: string[][],
  ) {
    this._nodes = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ]

    if (nodes) {
      this._nodes = nodes
    }

    this._hashValue = zobristKey.calcHash(this._nodes)
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

  public getHashValue(): number {
    return this._hashValue
  }

  public makeMove({ x, y }: ITicTacToeMove): TicTacToeBoard {
    if (!this.isEmptyNode(y, x)) {
      throw new Error(`Invalid move: ${x}, ${y}, \n${this.toString()}`)
    }

    this._nodes[y][x] = this._player.id

    this._player = this.getNextPlayer()

    this._hashValue = zobristKey.updateHash(this._nodes, this._hashValue, x, y)
    return this
  }

  public undoMove({ x, y }: ITicTacToeMove): TicTacToeBoard {
    this._nodes[y][x] = ' '

    this._player = this.getNextPlayer()

    this._hashValue = zobristKey.updateHash(this._nodes, this._hashValue, x, y)
    return this
  }

  public evaluateOld(): number {
    for (let j = 0; j < 2; j++) {
      let player = j === 0 ? this._player : this.getNextPlayer()

      for (let i = 0; i < 3; i++) {
        if (this.countPlayerNodesInRow(i, player) === 3) {
          return player === this._player ? Infinity : -Infinity
        }

        if (this.countPlayerNodesInColumn(i, player) === 3) {
          return player === this._player ? Infinity : -Infinity
        }
      }

      if (this.countPlayerNodesInMainDiagonal(player) === 3) {
        return player === this._player ? Infinity : -Infinity
      }

      if (this.countPlayerNodesInSecondaryDiagonal(player) === 3) {
        return player === this._player ? Infinity : -Infinity
      }
    }

    let score = 0

    score += this.evaluateRows()
    score += this.evaluateColumns()

    score += this.evaluateMainDiagonal()
    score += this.evaluateSecondaryDiagonal()

    return score
  }

  public evaluate(): number {
    /**
     * X2 is the number of lines with 2 X’s and a blank
     * X1 is the number of lines with 1 X and 2 blanks
     * O2 is the number of lines with 2 O’s and a blank
     * O1 is the number of lines with 1 O and 2 blanks
     *
     * 3 * X2 + X1 – (3 * O2 + O1)
     */

    for (let j = 0; j < 2; j++) {
      let player = j === 0 ? this._player : this.getNextPlayer()

      for (let i = 0; i < 3; i++) {
        if (this.countPlayerNodesInRow(i, player) === 3) {
          return player === this._player ? Infinity : -Infinity
        }

        if (this.countPlayerNodesInColumn(i, player) === 3) {
          return player === this._player ? Infinity : -Infinity
        }
      }

      if (this.countPlayerNodesInMainDiagonal(player) === 3) {
        return player === this._player ? Infinity : -Infinity
      }

      if (this.countPlayerNodesInSecondaryDiagonal(player) === 3) {
        return player === this._player ? Infinity : -Infinity
      }
    }

    const r1 = this.calcRows(this._player)
    const r2 = this.calcColumns(this._player)
    const r3 = this.calcMainDiag(this._player)
    const r4 = this.calcSecondaryDiag(this._player)

    const x2 = r1.x2 + r2.x2 + r3.x2 + r4.x2
    const x1 = r1.x1 + r2.x1 + r3.x1 + r4.x1
    const o2 = r1.o2 + r2.o2 + r3.o2 + r4.o2
    const o1 = r1.o1 + r2.o1 + r3.o1 + r4.o1

    return 3 * x2 + x1 - (3 * o2 + o1)
  }

  // X2 is the number of lines with 2 X’s and a blank
  public calcRows(player: ITicTacToePlayer): { x2: number; x1: number; o2: number; o1: number } {
    let x2 = 0
    let x1 = 0
    let o2 = 0
    let o1 = 0

    for (let i = 0; i < 3; i++) {
      let playerScore = 0
      let opponentScore = 0
      let blanks = 0

      this._nodes[i].forEach((n) => {
        if (n === player.id) {
          playerScore++
        } else if (n === this.getOppositePlayer(player).id) {
          opponentScore++
        } else {
          blanks++
        }
      })

      if (playerScore > 1 && blanks === 1) {
        x2++
      } else if (playerScore === 1 && blanks === 2) {
        x1++
      } else if (opponentScore > 1 && blanks === 1) {
        o2++
      } else if (opponentScore === 1 && blanks === 2) {
        o1++
      }
    }

    return { x2, x1, o2, o1 }
  }

  public calcColumns(player: ITicTacToePlayer): { x2: number; x1: number; o2: number; o1: number } {
    let x2 = 0
    let x1 = 0
    let o2 = 0
    let o1 = 0

    for (let i = 0; i < 3; i++) {
      let playerScore = 0
      let opponentScore = 0
      let blanks = 0

      this._nodes.forEach((n) => {
        if (n[i] === player.id) {
          playerScore++
        } else if (n[i] === this.getOppositePlayer(player).id) {
          opponentScore++
        } else {
          blanks++
        }
      })

      if (playerScore > 1 && blanks === 1) {
        x2++
      } else if (playerScore === 1 && blanks === 2) {
        x1++
      } else if (opponentScore > 1 && blanks === 1) {
        o2++
      } else if (opponentScore === 1 && blanks === 2) {
        o1++
      }
    }

    return { x2, x1, o2, o1 }
  }

  public calcMainDiag(player: ITicTacToePlayer): { x2: number; x1: number; o2: number; o1: number } {
    let x2 = 0
    let x1 = 0
    let o2 = 0
    let o1 = 0

    let playerScore = 0
    let opponentScore = 0
    let blanks = 0

    this._nodes.forEach((n, i) => {
      if (n[i] === player.id) {
        playerScore++
      } else if (n[i] === this.getOppositePlayer(player).id) {
        opponentScore++
      } else {
        blanks++
      }
    })

    if (playerScore > 1 && blanks === 1) {
      x2++
    } else if (playerScore === 1 && blanks === 2) {
      x1++
    } else if (opponentScore > 1 && blanks === 1) {
      o2++
    } else if (opponentScore === 1 && blanks === 2) {
      o1++
    }

    return { x2, x1, o2, o1 }
  }

  public calcSecondaryDiag(player: ITicTacToePlayer): { x2: number; x1: number; o2: number; o1: number } {
    let x2 = 0
    let x1 = 0
    let o2 = 0
    let o1 = 0

    let playerScore = 0
    let opponentScore = 0
    let blanks = 0

    this._nodes.forEach((n, i) => {
      if (n[2 - i] === player.id) {
        playerScore++
      } else if (n[2 - i] === this.getOppositePlayer(player).id) {
        opponentScore++
      } else {
        blanks++
      }
    })

    if (playerScore > 1 && blanks === 1) {
      x2++
    } else if (playerScore === 1 && blanks === 2) {
      x1++
    } else if (opponentScore > 1 && blanks === 1) {
      o2++
    } else if (opponentScore === 1 && blanks === 2) {
      o1++
    }

    return { x2, x1, o2, o1 }
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
    return new TicTacToeBoard(this._player1, this._player2, this._player, this.nodes)
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
