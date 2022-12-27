import { GridStore, gridStoreInitialState } from "~/modules/grid"
import { cloneDeep } from 'lodash'

export const getGridStoreInitialStateMock = (stateOverride: Partial<GridStore> = {}) => {
  const state: Readonly<GridStore> = {
    ...gridStoreInitialState,
    ...stateOverride
  }

  const draft = cloneDeep<GridStore>(state)

  return {
    state,
    draft
  }
}
