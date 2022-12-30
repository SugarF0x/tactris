import { Position } from "~/modules/position"
import { GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid/config"
import { exhaust } from "~/utils"

export enum FloorCorner {
  TOP_LEFT = "TOP_LEFT",
  TOP_RIGHT = "TOP_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

export function floorTetra(tetra: Position[], corner = FloorCorner.TOP_LEFT, size?: number): Position[] {
  const [minX, minY] = tetra.reduce((acc, val) => {
    acc[0] = Math.min(val.x, acc[0])
    acc[1] = Math.min(val.y, acc[1])
    return acc
  }, [GRID_WIDTH, GRID_HEIGHT])

  const flooredTetra = tetra.map(pos => {
    pos.x -= minX
    pos.y -= minY
    return pos
  })

  const flooredSize = size ? size - 1 : Math.max(minX, minY)
  const shiftX = Math.max(flooredSize - minX, 0)
  const shiftY = Math.max(flooredSize - minY, 0)

  switch (corner) {
    case FloorCorner.TOP_LEFT: return flooredTetra
    case FloorCorner.TOP_RIGHT: return flooredTetra.map(({ x, y }) => ({ x: x + shiftX, y }))
    case FloorCorner.BOTTOM_LEFT: return flooredTetra.map(({ x, y }) => ({ x, y: y + shiftY }))
    case FloorCorner.BOTTOM_RIGHT: return flooredTetra.map(({ x, y }) => ({ x: x + shiftX, y: y + shiftY }))
    default: exhaust(corner)
  }
}
