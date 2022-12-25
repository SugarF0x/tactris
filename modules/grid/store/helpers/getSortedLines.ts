import { CompletionLine, ShiftInstructions } from "~/modules/grid/types"

export function getSortedLines(lines: CompletionLine[], instructionsMap: WeakMap<CompletionLine, ShiftInstructions>) {
  return lines.sort((a, b) => {
    const instructions = instructionsMap.get(a)
    if (!instructions) return 0

    if (instructions === ShiftInstructions.INCREASE) return a.value - b.value
    return b.value - a.value
  })
}
