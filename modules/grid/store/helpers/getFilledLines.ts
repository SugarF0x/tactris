import { PositionId } from "~/utils"
import { CompletionLine } from "~/modules/grid"
import { lineToPositionIds } from "~/modules/grid/store/helpers/lineToPositionIds"

export function getFilledLines(filled: PositionId[], lines: CompletionLine[]): CompletionLine[] {
  return lines.filter(line => {
    const lineIds = lineToPositionIds(line)
    return lineIds.every(id => filled.includes(id))
  })
}
