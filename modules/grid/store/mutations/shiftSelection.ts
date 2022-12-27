import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"

export function shiftSelection(state: WritableDraft<GridStore>): void {
  state.selectedIds.shift()
}
