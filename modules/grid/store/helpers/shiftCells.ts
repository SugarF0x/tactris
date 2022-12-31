import { ShiftInstructions } from "~/modules/grid/types"
import { Axis, idToPosition, PositionId, positionToId } from "~/utils"

export function shiftCells(posIds: PositionId[], axis: Axis, instructions: ShiftInstructions): PositionId[] {
  if (instructions === ShiftInstructions.RETAIN) return posIds

  return posIds.map(posId => {
    const pos = idToPosition(posId)

    if (instructions === ShiftInstructions.INCREASE) pos[axis]++
    else pos[axis]--

    return positionToId(pos)
  })
}
