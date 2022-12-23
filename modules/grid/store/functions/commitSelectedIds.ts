import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"
import { idToPosition } from "~/modules/position"
import { doesInputMatchTetra, getRandomTetra } from "~/modules/tetra"
import { filterInstructedRelativeIds, getCollapseInstructions, getCompletionLines, getFilledLines, linesToPositionIdSet, shiftCells } from "~/modules/grid/store/helpers"

export function commitSelectedIds(state: WritableDraft<GridStore>): void {
  if (state.selectedIds.length < 4) return

  const selectedTetra = state.selectedIds.map(idToPosition)

  for (const [key, tetra] of Object.entries(state.tetras)) {
    const index = Number(key) as 0 | 1
    if (!doesInputMatchTetra(selectedTetra, tetra)) continue

    // update matched tetra with a new random one
    const oldTetraTypes = state.tetras.map(tetra => tetra.type)
    state.tetras[index] = getRandomTetra(oldTetraTypes)

    // check possible completion lines based on input
    const completionLines = getCompletionLines(state.selectedIds)

    // commit selection to filled and clear it
    state.filledIds.push(...state.selectedIds)
    state.selectedIds.length = 0

    // remove filled lines
    const filledLines = getFilledLines(state.filledIds, completionLines)
    const filledLineIds = linesToPositionIdSet(filledLines)
    state.filledIds = state.filledIds.filter(id => !filledLineIds.includes(id))

    // shift remaining cells towards center
    for (const line of filledLines) {
      const instructions = getCollapseInstructions(line)
      const idsToShift = filterInstructedRelativeIds(state.filledIds, line, instructions)
      state.filledIds = state.filledIds.filter(id => !idsToShift.includes(id))
      state.filledIds.push(...shiftCells(idsToShift, line.axis, instructions))
    }

    break
  }
}
