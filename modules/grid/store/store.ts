import create from 'zustand'
import { GridStore } from './types'
import { commitSelectedIds, restart, selectId } from './functions'
import { getInitialTetras } from './helpers'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { temporal } from 'zundo'
import { isEqual } from 'lodash'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useGridStore = create<GridStore>()(persist(temporal(immer((set) => ({
  filledIds: [],
  selectedIds: [],
  tetras: getInitialTetras(),
  selectId: (id) => set(state => selectId(state, id)),
  commitSelectedIds: () => set(commitSelectedIds),
  restart: () => set(restart)
})), {
  limit: 1,
  partialize: (state) => {
    const { filledIds, tetras } = state
    return { filledIds, tetras }
  },
  equality: isEqual
}), {
  name: 'grid-storage',
  getStorage: () => AsyncStorage
}))

export const gridStoreInitialState = useGridStore.getState()
export const useTemporalGridStore = create(useGridStore.temporal)
