import { IMove } from '../negamax'
import { TranspositionTable } from './transposition-table'
import { ITableEntry } from './transposition-table.h'

describe('transposition-table', () => {
  it('should support adding and getting entries', () => {
    const tableSize = 100
    const table = new TranspositionTable(tableSize)
    const entry1: ITableEntry = {
      hashValue: 0,
      depth: 0,
      score: 0,
      bestMove: {} as IMove,
      scoreType: 0,
    }

    const entry2: ITableEntry = {
      hashValue: 99,
      depth: 0,
      score: 0,
      bestMove: {} as IMove,
      scoreType: 0,
    }

    table.setEntry(entry1)
    table.setEntry(entry2)

    expect(table.getEntry(0)).toEqual(entry1)
    expect(table.getEntry(99)).toEqual(entry2)
  })

  it('should support adding and getting entries with the same hash value', () => {
    const tableSize = 100
    const table = new TranspositionTable(tableSize)
    const entry1: ITableEntry = {
      hashValue: 0,
      depth: 0,
      score: 0,
      bestMove: {} as IMove,
      scoreType: 0,
    }

    const entry2: ITableEntry = {
      hashValue: 0,
      depth: 0,
      score: 2,
      bestMove: {} as IMove,
      scoreType: 0,
    }

    table.setEntry(entry1)
    table.setEntry(entry2)

    expect(table.getEntry(0)).toEqual(entry2)
  })

  it('should override entries when value is beyond table size', () => {
    const tableSize = 100
    const table = new TranspositionTable(tableSize)
    const entry1: ITableEntry = {
      hashValue: 0,
      depth: 0,
      score: 0,
      bestMove: {} as IMove,
      scoreType: 0,
    }

    const entry2: ITableEntry = {
      hashValue: 100,
      depth: 0,
      score: 2,
      bestMove: {} as IMove,
      scoreType: 0,
    }

    table.setEntry(entry1)
    table.setEntry(entry2)

    // since 0 entry was overwritten by overlapping 100 entry it will be null
    expect(table.getEntry(0)).toBeNull()
    expect(table.getEntry(100)).toBe(entry2)
  })
})
