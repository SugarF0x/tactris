import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store"
import { clearSelection, updateMatchedTetra, clearFilledLines } from "~/modules/grid/store/mutations"
import { GRID_WIDTH } from "~/modules/grid/config"
import { Axis } from "~/utils"

export function restart(state: WritableDraft<GridStore>): void {
  updateMatchedTetra(state, 0)
  updateMatchedTetra(state, 1)

  clearSelection(state)
  clearFilledLines(state, Array.from({ length: GRID_WIDTH }, (_, i) => ({ axis: Axis.X, value: i })))
}
