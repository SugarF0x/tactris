import create from 'zustand'
import { GridStore } from './types'
import { commitSelectedIds, selectId } from './functions'
import { getInitialTetras } from './helpers'
import { immer } from 'zustand/middleware/immer'
import { temporal } from 'zundo'
import { isEqual } from 'lodash'

export const useGridStore = create<GridStore>()(temporal(immer((set) => ({
  filledIds: [],
  selectedIds: [],
  tetras: getInitialTetras(),
  selectId: (id) => set(state => selectId(state, id)),
  commitSelectedIds: () => set(commitSelectedIds)
})), {
  limit: 1,
  partialize: (state) => {
    const { filledIds, tetras } = state
    return { filledIds, tetras }
  },
  equality: isEqual
}))

export const gridStoreInitialState = useGridStore.getState()
export const useTemporalGridStore = create(useGridStore.temporal)
