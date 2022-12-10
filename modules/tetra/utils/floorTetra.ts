import { Position } from "~/modules/position"

export function floorTetra<T extends Position[]>(tetra: T): T {
  const [minX, minY] = tetra.reduce((acc, val) => {
    acc[0] = Math.min(val.x, acc[0])
    acc[1] = Math.min(val.y, acc[1])
    return acc
  }, [10, 10])

  return tetra.map(pos => {
    pos.x -= minX
    pos.y -= minY
    return pos
  }) as T
}
