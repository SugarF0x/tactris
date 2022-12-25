import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"

export function commitSelection(state:WritableDraft<GridStore>): void {
  state.filledIds.push(...state.selectedIds)
}
