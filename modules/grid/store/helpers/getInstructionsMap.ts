import { CompletionLine, ShiftInstructions } from "~/modules/grid/types"
import { getCollapseInstructions } from "./getCollapseInstructions"

export function getInstructionsMap(lines: CompletionLine[]): WeakMap<CompletionLine, ShiftInstructions> {
  return new WeakMap(lines.map(line => [line, getCollapseInstructions(line)]))
}
