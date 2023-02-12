import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"
import { idToPosition } from "~/utils"
import { doesInputMatchTetra } from "~/modules/tetra"
import { getCompletionLines, getFilledLines, getInstructionsMap, getSortedLines } from "~/modules/grid/store/helpers"
import { applyShiftInstructions, clearFilledLines, clearSelection, commitSelection, updateMatchedTetra } from "~/modules/grid/store/mutations"
import { useScoreStore } from "~/modules/score"

export function commitSelectedIds(state: WritableDraft<GridStore>): void {
  if (state.selectedIds.length < 4) return

  const selectedTetra = state.selectedIds.map(idToPosition)
  const tetraMatch = state.tetras.available.find(tetra => doesInputMatchTetra(selectedTetra, tetra))
  if (!tetraMatch) return

  updateMatchedTetra(state, state.tetras.available.indexOf(tetraMatch))
  commitSelection(state)

  const completionLines = getCompletionLines(state.selectedIds)
  clearSelection(state)

  const filledLines = getFilledLines(state.filledIds, completionLines)
  clearFilledLines(state, filledLines)

  const instructionsMap = getInstructionsMap(filledLines)
  const sortedLines = getSortedLines(filledLines, instructionsMap)
  applyShiftInstructions(state, sortedLines, instructionsMap)

  useScoreStore.getState().updateScore(filledLines)
}
