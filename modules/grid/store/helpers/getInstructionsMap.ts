import { CompletionLine, ShiftInstructions } from "~/modules/grid/types"
import { getCollapseInstructions } from "./getCollapseInstructions"

export function getInstructionsMap(lines: CompletionLine[]): WeakMap<CompletionLine, ShiftInstructions> {
  const instructionsMap = new WeakMap<CompletionLine, ShiftInstructions>()
  lines.forEach(line => instructionsMap.set(line, getCollapseInstructions(line)))
  return instructionsMap
}
