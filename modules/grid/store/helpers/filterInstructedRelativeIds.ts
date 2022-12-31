import { CompletionLine, ShiftInstructions } from "~/modules/grid/types"
import { idToPosition, PositionId } from "~/utils"

export function filterInstructedRelativeIds(posIds: PositionId[], line: CompletionLine, instructions: ShiftInstructions): PositionId[] {
  if (instructions === ShiftInstructions.RETAIN) return []

  const { axis, value } = line

  return posIds.filter(id => {
    const axisValue = idToPosition(id)[axis]

    if (instructions === ShiftInstructions.INCREASE) return axisValue < value
    return axisValue > value
  })
}
