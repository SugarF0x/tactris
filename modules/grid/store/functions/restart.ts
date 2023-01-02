import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore, gridStoreInitialState } from "~/modules/grid"
import { getInitialTetras } from "~/modules/grid/store/helpers"

export function restart(state: WritableDraft<GridStore>): void {
  Object.assign(state, gridStoreInitialState)
  state.tetras = getInitialTetras()
}
