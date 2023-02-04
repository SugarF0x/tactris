import { Position, rotateMatrix } from "~/utils"
import { TetraObject, TetraRotation, TetraType } from '../types'
import { sample, cloneDeep, isEqual, differenceWith } from "lodash"

export const TetrasDictionary: Record<TetraType, [Array<number[]>, TetraRotation]> = {
  L: [
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    3
  ],
  P: [
    [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    3
  ],
  Z: [
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    1
  ],
  S: [
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    1
  ],
  I: [
    [
      [1],
      [1],
      [1],
      [1],
    ],
    1
  ],
  T: [
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    3
  ],
  O: [
    [
      [1, 1],
      [1, 1],
    ],
    0
  ],
}

export const allPossibleTetras = (Object.entries(TetrasDictionary) as unknown as [TetraType, [Array<number[]>, TetraRotation]][]).reduce<TetraObject[]>((acc, [type, [, rotations]]) => {
  for (let rotation = 0; rotation <= rotations; rotation++) {
    acc.push({ type, rotation: rotation as TetraRotation })
  }

  return acc
}, [])

export function convertTetraToPositions(tetra: TetraObject): Position[] {
  const { type, rotation } = tetra

  let [rows] = TetrasDictionary[type]

  for (let i = 0; i < rotation; i++) {
    rows = rotateMatrix(rows)
  }

  const positions: Position[] = []

  rows.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (!col) return
      positions.push({ x: colIndex, y: rowIndex })
    })
  })

  return positions
}

export function getRandomTetra(exclude: TetraObject[] = []): TetraObject {
  const availableTetras = differenceWith(allPossibleTetras, exclude, isEqual)
  const newTetra = sample(availableTetras)

  if (!newTetra) throw new Error('ERR: no available tetras in total tetras stack found')
  return cloneDeep(newTetra)
}
