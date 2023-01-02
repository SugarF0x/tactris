import { PositionId, positionToId } from "~/utils"
import { GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid/config"

const allGridPositionIdsCache: PositionId[] = []

export function getAllGridPositionIds(): PositionId[] {
  if (allGridPositionIdsCache.length) return allGridPositionIdsCache

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      allGridPositionIdsCache.push(positionToId({ x, y }))
    }
  }

  return allGridPositionIdsCache
}
