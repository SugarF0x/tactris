import { CompletionLine, axisToGridSizeMap } from "~/modules/grid"

export function completionsToScore(completionLines: CompletionLine[]): number {
  return completionLines.reduce((acc, line, index) => {
    const baseScorePerLine = axisToGridSizeMap[line.axis]
    const sequenceMultiplier = index + 1

    return acc + baseScorePerLine * sequenceMultiplier
  }, 0)
}
