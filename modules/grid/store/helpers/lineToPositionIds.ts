import { CompletionLine } from "~/modules/grid/types"
import { Axis, PositionId, positionToId } from "~/utils"
import { axisToGridSizeMap } from "~/modules/grid/config"

export function lineToPositionIds(line: CompletionLine): PositionId[] {
  const positions: PositionId[] = []

  const { axis, value } = line
  const length = axisToGridSizeMap[axis]

  for (let i = 0; i < length; i++) {
    positions.push(positionToId({
      [Axis.X]: i,
      [Axis.Y]: i,
      [axis]: value
    }))
  }

  return positions
}
