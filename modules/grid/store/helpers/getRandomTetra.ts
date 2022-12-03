import { Position, Tetra } from "../types"

enum TetrasDictionary {
  L = `
    10
    10
    11
  `,
  P = `
    11
    10
    10
  `,
  Z = `
    110
    011
  `,
  S = `
    011
    110
  `,
  I = `
    1
    1
    1
    1
  `,
  T = `
    010
    111
  `,
  O = `
    11
    11
  `
}

function dictToTetra(val: string): Tetra {
  const result: Position[] = []

  const rows = val.replaceAll(' ', '').split('\n').filter(Boolean)

  for (const [rowIndex, row] of Object.entries(rows)) {
    for (const [cellIndex, cell] of Object.entries(row)) {
      if (!Number(cell)) continue
      result.push({ x: Number(cellIndex), y: Number(rowIndex) })
    }
  }

  return result as Tetra
}

export function getRandomTetra(): Tetra {
  const TetrasDictValues = Object.values(TetrasDictionary)
  const randomTetraDict = TetrasDictValues[Math.floor(Math.random() * TetrasDictValues.length)]
  return dictToTetra(randomTetraDict)
}
