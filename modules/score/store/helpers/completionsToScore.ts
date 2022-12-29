import { CompletionLine } from "~/modules/grid/types"
import { axisToGridSizeMap } from "~/modules/grid/config"

export function completionsToScore(completionLines: CompletionLine[]): number {
  return completionLines.reduce((acc, line, index) => {
    const baseScorePerLine = axisToGridSizeMap[line.axis]
    const sequenceMultiplier = index + 1

    return acc + baseScorePerLine * sequenceMultiplier
  }, 0)
}
