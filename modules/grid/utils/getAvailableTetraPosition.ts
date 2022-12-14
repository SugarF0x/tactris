import { PositionId, positionToId } from "~/utils"
import { getTetraSize } from "~/modules/tetra/utils/getTetraSize"
import { GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid/config"
import { convertTetraToPositions, TetraObject } from "~/modules/tetra"

export function getAvailableTetraPosition(tetra: TetraObject, filled: PositionId[]): PositionId[] | null {
  const positions = convertTetraToPositions(tetra)
  const size = getTetraSize(positions)

  for (let y = 0; y < GRID_HEIGHT - size.y; y++) {
    for (let x = 0; x < GRID_WIDTH - size.x; x++) {
      const potentialTetraPositionIds = positions.map((pos) => positionToId({ x: pos.x + x, y: pos.y + y }))
      if (potentialTetraPositionIds.every(id => !filled.includes(id))) return potentialTetraPositionIds
    }
  }

  return null
}
