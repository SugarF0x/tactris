import { GridStore } from "~/modules/grid/store/types"
import { PositionId } from "~/modules/position"
import { WritableDraft } from "immer/dist/types/types-external"

export function selectId(state: WritableDraft<GridStore>, id: PositionId): void {
  if (state.selectedIds.includes(id)) return
  if (state.filledIds.includes(id)) return

  // TODO: move these to mutations and test cover

  if (state.selectedIds.length >= 4) state.selectedIds.shift()

  state.selectedIds.push(id)
}
