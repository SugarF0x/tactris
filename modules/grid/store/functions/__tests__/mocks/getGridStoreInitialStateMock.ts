import { GridStore } from "~/modules/grid"
import { getInitialTetras } from "~/modules/grid/store/helpers"
import { cloneDeep } from 'lodash'

export const getGridStoreInitialStateMock = (stateOverride: Partial<GridStore> = {}) => {
  const state: Readonly<GridStore> = {
    commitSelectedIds: () => {},
    selectId: () => {},
    selectedIds: [],
    filledIds: [],
    tetras: getInitialTetras(),
    ...stateOverride
  }

  const draft = cloneDeep<GridStore>(state)

  return {
    state,
    draft
  }
}
