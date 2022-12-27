import create from 'zustand'
import { GridStore } from './types'
import { commitSelectedIds, selectId } from './functions'
import { getInitialTetras } from './helpers'
import { immer } from 'zustand/middleware/immer'

export const useGridStore = create<GridStore>()(immer((set) => ({
  filledIds: [],
  selectedIds: [],
  tetras: getInitialTetras(),
  selectId: (id) => set(state => selectId(state, id)),
  commitSelectedIds: () => set(commitSelectedIds)
})))

export const gridStoreInitialState = useGridStore.getState()
