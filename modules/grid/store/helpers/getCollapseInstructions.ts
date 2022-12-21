import { CompletionLine, axisToGridSizeMap } from "~/modules/grid"

export function getCollapseInstructions(line: CompletionLine): CompletionLine | null {
  const { axis, value } = line
  const size = axisToGridSizeMap[axis]

  if (value === 0 || value === size) return null

  const median = size / 5
  const shift = value > median ? -1 : 1

  return {
    axis,
    value: shift
  }
}
