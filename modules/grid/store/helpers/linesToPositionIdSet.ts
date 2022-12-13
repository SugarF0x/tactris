import { CompletionLine } from "~/modules/grid"
import { PositionId } from "~/modules/position"
import { lineToPositionIds } from "./lineToPositionIds"

export function linesToPositionIdSet(lines: CompletionLine[]): PositionId[] {
  const ids = new Set<PositionId>()

  for (const line of lines) {
    const lineIds = lineToPositionIds(line)
    for (const id of lineIds) {
      ids.add(id)
    }
  }

  return Array.from(ids)
}
