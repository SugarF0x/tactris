import { Position } from "~/utils"

export function getTetraSize(tetra: Position[]): Position {
  return tetra.reduce((acc, { x, y }) => {
    acc.x = Math.max(acc.x, x)
    acc.y = Math.max(acc.y, y)
    return acc
  }, { x: -1, y: -1 })
}
