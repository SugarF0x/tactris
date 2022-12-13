import { PositionId } from "~/modules/position"

export function getCompletionIntersections(filled: PositionId[], specs: Array<PositionId[]>): PositionId[] {
  const completedIds = new Set<PositionId>()

  for (const spec of specs) {
    if (!spec.every(id => filled.includes(id))) continue
    for (const id of spec) {
      completedIds.add(id)
    }
  }

  return Array.from(completedIds)
}
