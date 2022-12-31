import { PositionId } from "~/utils"
import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"

export function addSelectedId(state: WritableDraft<GridStore>, id: PositionId): void {
  state.selectedIds.push(id)
}
