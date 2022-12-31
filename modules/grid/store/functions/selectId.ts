import { GridStore } from "~/modules/grid/store/types"
import { PositionId } from "~/utils"
import { WritableDraft } from "immer/dist/types/types-external"
import { addSelectedId, shiftSelection } from "~/modules/grid/store/mutations"

export function selectId(state: WritableDraft<GridStore>, id: PositionId): void {
  if (state.selectedIds.includes(id)) return
  if (state.filledIds.includes(id)) return

  if (state.selectedIds.length >= 4) shiftSelection(state)
  addSelectedId(state, id)
}
