import { PositionId, positionToId } from "~/modules/position"
import { GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid"

export function getAllGridPositionIds(): PositionId[] {
  const ids: PositionId[] = []

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      ids.push(positionToId({ x, y }))
    }
  }

  return ids
}
