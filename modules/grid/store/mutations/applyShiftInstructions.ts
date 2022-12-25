import { CompletionLine, ShiftInstructions } from "~/modules/grid/types"
import { filterInstructedRelativeIds, shiftCells } from "~/modules/grid/store/helpers"
import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"

export function applyShiftInstructions(state: WritableDraft<GridStore>, lines: CompletionLine[], instructionsMap: WeakMap<CompletionLine, ShiftInstructions>): void {
  for (const line of lines) {
    const instructions = instructionsMap.get(line)
    if (!instructions) continue

    const idsToShift = filterInstructedRelativeIds(state.filledIds, line, instructions)
    state.filledIds = state.filledIds.filter(id => !idsToShift.includes(id))
    state.filledIds.push(...shiftCells(idsToShift, line.axis, instructions))
  }
}
