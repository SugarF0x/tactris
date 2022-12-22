import { CompletionLine, axisToGridSizeMap, ShiftInstructions } from "~/modules/grid"

export function getCollapseInstructions(line: CompletionLine): ShiftInstructions {
  const { axis, value } = line
  const size = axisToGridSizeMap[axis]

  if (value === 0 || value === size) return ShiftInstructions.RETAIN

  const median = size / 2
  const shift = value > median ? -1 : 1

  if (shift > 0) return ShiftInstructions.INCREASE
  return ShiftInstructions.DECREASE
}
