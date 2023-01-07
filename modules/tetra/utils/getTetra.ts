import { Position, rotateMatrix } from "~/utils"
import { TetraObject, TetraRotation, TetraType } from '../types'

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
    [1, 1, 1],
    [0, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ]
}

export function convertTetraToPositions(tetra: TetraObject): Position[] {
  const { type, rotation } = tetra

  let rows = TetrasDictionary[type]

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

export function getRandomTetraRotation(exclude: TetraRotation[] = []): TetraRotation {
  const sortedExclusions = exclude.sort()
  const availableRotations = 4 - sortedExclusions.length

  let rotation = Math.floor(Math.random() * availableRotations)
  for (const exclusion of sortedExclusions) if (rotation === exclusion) rotation++

  return rotation as TetraRotation
}

export function getRandomTetra(exclude: TetraObject[] = []): TetraObject {
  const availableTypes = Object.values(TetraType)
  const type = availableTypes[Math.floor(Math.random() * availableTypes.length)]

  const excludedRotations = exclude.filter(tetra => tetra.type === type).map(tetra => tetra.rotation)
  const rotation = getRandomTetraRotation(excludedRotations)

  return {
    type,
    rotation
  }
}
