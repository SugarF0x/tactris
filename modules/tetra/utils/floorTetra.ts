import { Position, exhaust } from "~/utils"
import { GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid/config"
import { getTetraSize } from "~/modules/tetra/utils/getTetraSize"

export enum FloorCorner {
  TOP_LEFT = "TOP_LEFT",
  TOP_RIGHT = "TOP_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

export function floorTetra(tetra: Position[], corner = FloorCorner.TOP_LEFT, size?: Position): Position[] {
  const min = tetra.reduce((acc, val) => {
    acc.x = Math.min(val.x, acc.x)
    acc.y = Math.min(val.y, acc.y)
    return acc
  }, { x: GRID_WIDTH, y: GRID_HEIGHT })

  const max = getTetraSize(tetra)

  const flooredTetra = tetra.map(pos => {
    pos.x -= min.x
    pos.y -= min.y
    return pos
  })

  const { x: sizeX, y: sizeY } = size ? size : { x: max.x, y: max.y }
  const shiftX = Math.max(sizeX - max.x, 0)
  const shiftY = Math.max(sizeY - max.y, 0)

  switch (corner) {
    case FloorCorner.TOP_LEFT: return flooredTetra
    case FloorCorner.TOP_RIGHT: return flooredTetra.map(({ x, y }) => ({ x: x + shiftX, y }))
    case FloorCorner.BOTTOM_LEFT: return flooredTetra.map(({ x, y }) => ({ x, y: y + shiftY }))
    case FloorCorner.BOTTOM_RIGHT: return flooredTetra.map(({ x, y }) => ({ x: x + shiftX, y: y + shiftY }))
    default: exhaust(corner)
  }
}
