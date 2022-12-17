import { Position } from "~/modules/position"
import { TetraObject, TetraType } from '../types'

export const TetrasDictionary: Record<TetraType, Array<number[]>> = {
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

export function getSpecificTetra(type: TetraType): TetraObject {
  const rows = TetrasDictionary[type]
  const positions: Position[] = []

  rows.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (!col) return
      positions.push({ x: colIndex, y: rowIndex })
    })
  })

  return {
    type,
    positions
  }
}

export function getRandomTetra(exclude: TetraType[] = []): TetraObject {
  const availableTypes = Object.values(TetraType).filter(type => !exclude.includes(type))
  const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)]
  return getSpecificTetra(randomType)
}
