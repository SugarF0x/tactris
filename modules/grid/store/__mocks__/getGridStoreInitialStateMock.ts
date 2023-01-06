import { GridStore, gridStoreInitialState } from "~/modules/grid"
import { cloneDeep, merge } from 'lodash'
import { DeepPartial } from "~/utils/types"

export const getGridStoreInitialStateMock = (stateOverride: DeepPartial<GridStore> = {}) => {
  const state: Readonly<GridStore> = merge(gridStoreInitialState, stateOverride)
  const draft = cloneDeep<GridStore>(state)

  return {
    state,
    draft
  }
}
