import { Position, Tetra } from "../types"

export enum TetraType {
  L = 'L',
  P = 'P',
  Z = 'Z',
  S = 'S',
  I = 'I',
  T = 'T',
  O = 'O',
}

const TetrasDictionary: Record<TetraType, Array<number[]>> = {
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  P: [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  I: [
    [1],
    [1],
    [1],
    [1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ]
}

function dictToTetra(rows: Array<number[]>): Tetra {
  const result: Position[] = []

  rows.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (!col) return
      result.push({ x: colIndex, y: rowIndex })
    })
  })

  return result as Tetra
}

export function getRandomTetra(): Tetra {
  const TetrasDictValues = Object.values(TetrasDictionary)
  const randomTetraDict = TetrasDictValues[Math.floor(Math.random() * TetrasDictValues.length)]
  return dictToTetra(randomTetraDict)
}
