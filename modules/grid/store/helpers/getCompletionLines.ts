import { Axis, idToPosition, PositionId } from "~/utils"
import { CompletionLine } from "~/modules/grid/types"

export function getCompletionLines(selected: PositionId[]): CompletionLine[] {
  const xValues = new Set<number>()
  const yValues = new Set<number>()

  for (const id of selected) {
    const { x, y } = idToPosition(id)
    xValues.add(x)
    yValues.add(y)
  }

  return [
    ...Array.from(xValues).map(value => ({ axis: Axis.X, value })),
    ...Array.from(yValues).map(value => ({ axis: Axis.Y, value })),
  ]
}
