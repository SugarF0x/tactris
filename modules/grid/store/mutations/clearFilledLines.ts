import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"
import { CompletionLine } from "~/modules/grid/types"
import { linesToPositionIdSet } from "~/modules/grid/store/helpers"

export function clearFilledLines(state: WritableDraft<GridStore>, lines: CompletionLine[]): void {
  const filledLineIds = linesToPositionIdSet(lines)
  state.filledIds = state.filledIds.filter(id => !filledLineIds.includes(id))
}
